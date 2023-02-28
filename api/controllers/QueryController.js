"use strict"
const { Configuration, OpenAIApi } = require("openai")
const fs = require("fs")
const { validation } = require("../helpers")
const { env } = require("process")
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

module.exports = {
  completion: completion,
  completionv1: completionv1,
}

async function getPromptInfo(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `convert to english and then extract color, person names and car companies from the below statement\n${prompt}\n`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  const choices = response.data.choices[0]
  const removeEmptyArr = choices.text.split("\n").filter((item) => item !== "")

  const english = removeEmptyArr[0].split(":")[1].trim()
  const color = removeEmptyArr[1].split(":")[1].trim().toLowerCase()
  const agent = removeEmptyArr[2].split(":")[1].trim().toLowerCase()
  const car = removeEmptyArr[3].split(":")[1].trim().toLowerCase()

  const res = validation({ car, agent, color })

  return res
}
async function translate(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Translate to english \nget all my adui cars\n\nEnglish:Get all of my audi cars.\n${prompt}`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  const choices = response.data.choices[0]
  const removeEmptyArr = choices.text.split("\n").filter((item) => item !== "")

  return removeEmptyArr[0].split(":")[1].trim()
}
async function completion(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    })
    return
  }

  const prompt = req.swagger.params.prompt.value || ""
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid instruction",
      },
    })
    return
  }

  try {
    const newPrompt = await translate(prompt)
    debugger
    const completion = await openai.createCompletion({
      model: process.env.MODEL,
      prompt: newPrompt,
      max_tokens: 20,
      temperature: 0,
      top_p: 1,
      logprobs: 2,
    })
    const response = completion.data.choices[0].text
    // const keywordsObj =response.find(item=>item.includes("Keywords:"));
    // const keywords= keywordsObj.slice("Keywords:".length,keywordsObj.length).trim()

    // const entitiesObj =response.find(item=>item.includes("Entities:"));
    // const entities =entitiesObj.slice("Entities:".length,entitiesObj.length).trim()
    // const englishObj = response.find(item=>item.includes("English"));

    // const english =entitiesObj.slice("English".length,englishObj.length).trim()
    // const response = {
    //   status: 200,
    //   data: {
    //     query: "given input",
    //     reportDefinition: "",
    //     params: [
    //       {
    //         type: "date",
    //         value: "Current Year",
    //       },
    //     ],
    //   },
    // }
    res.status(200).send(response)
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      })
    }
  }
}
async function completionv1(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    })
    return
  }

  const prompt = req.swagger.params.prompt.value || ""
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid instruction",
      },
    })
    return
  }

  try {
    // const info = await getPromptInfo(prompt)
    const completion = await openai.createCompletion({
      model:process.env.MODEL,
      prompt: `Translate below statement to english and get the output\n${prompt} ->`,
      max_tokens: 250,
      temperature: 0,
      top_p: 1,
      logprobs: 2,
      stop: " END"
    })
    // const response =completion.data.choices[0].text.split('\n').filter(item=>item !=='');
    // const keywordsObj =response.find(item=>item.includes("Keywords:"));
    // const keywords= keywordsObj.slice("Keywords:".length,keywordsObj.length).trim()

    // const entitiesObj =response.find(item=>item.includes("Entities:"));
    // const entities =entitiesObj.slice("Entities:".length,entitiesObj.length).trim()
    // const englishObj = response.find(item=>item.includes("English"));

    // const english =entitiesObj.slice("English".length,englishObj.length).trim()

    const dummyResponse = completion.data.choices[0].text;
    //  "RD:ListofCarsSoldComplex,MF:Audi,AG:Ram,TF:Previous Month END"
    const dRArr = dummyResponse.split(",")
    //car
    const carObj = dRArr.find((item) => item.includes("MF:"))
    let carName = ""
    if (carObj) {
      carName = carObj.split(":")[1].toLowerCase();
      const validateCar = validation("cars", carName)
      if (validateCar !== "pass") {
        const response = {
          status: 404,
          message: validateCar,
        }
       return res.status(200).send(response)
      }
    }

    //agent
    const agentObj = dRArr.find((item) => item.includes("AG:"))
    let agentName = ""
    if (agentObj) {
      agentName = agentObj.split(":")[1].toLowerCase()
      const validateAgent = validation("agents", agentName)
      if (validateAgent !== "pass") {
        const response = {
          status: 404,
          message: validateAgent,
        }
       return res.status(200).send(response)
      }
    }

    //rd
    let rd = dRArr.find((item) => item.includes("RD:"))
    rd = rd ? rd.split(":")[1] : ""
    // time
    let tf = dRArr.find((item) => item.includes("TF:"))
    tf = tf ? tf.split(":")[1] : ""

    // income
    let af = dRArr.find((item) => item.includes("AF:"))
    af = af ? af.split(":")[1] : ""

    const response = {
      status: 200,
      data: {
        query: "",
        reportDefinition: rd,
        params: [
          {
            CarSoldDate: tf,
            AgentName: agentName,
            CarColor: "",
            CarBrand: carName,
            CustomerIncome: af,
            EstimatedDateOfDelivery: "",
          },
        ],
      },
    }
    res.status(200).send(response)
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      })
    }
  }
}

function generatePromptForKeywords(query) {
  return `Translate the below statment to English then extract the keywords and entities
  show GCS_TEam@gcs workgroup\n\n${query}`
}
