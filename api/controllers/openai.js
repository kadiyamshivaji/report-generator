"use strict"
const { Configuration, OpenAIApi } = require("openai")
const fs = require("fs")
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

var util = require("util")

module.exports = {
  hello: hello,
  completions: completions,
  getListOfFiles: getListOfFiles,
  createFile: createFile,
  deleteFile: deleteFile,
  createFineTune: createFineTune,
  getfineTuneList: getfineTuneList,
}

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.name.value || "stranger"
  var hello = util.format("Hello, %s!", name)

  // this sends back a JSON response which is a single string
  res.json(hello)
}
async function completions(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    })
    return
  }

  const animal = req.swagger.params.input.value || ""
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid instruction",
      },
    })
    return
  }

  try {
    const completion = await openai.createCompletion({
      // model: "curie:ft-personal-2023-02-26-10-03-22",//"text-davinci-003",
      // prompt:animal,
      // temperature: 0,
      // max_tokens: 256,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      model: "davinci:ft-personal-2023-02-26-13-09-00",
      prompt: `${animal}`,
      max_tokens: 250,
      temperature: 0,
      top_p: 1,
      logprobs: 2,
    })
    // const response =completion.data.choices[0].text.split('\n').filter(item=>item !=='');
    // const keywordsObj =response.find(item=>item.includes("Keywords:"));
    // const keywords= keywordsObj.slice("Keywords:".length,keywordsObj.length).trim()

    // const entitiesObj =response.find(item=>item.includes("Entities:"));
    // const entities =entitiesObj.slice("Entities:".length,entitiesObj.length).trim()
    // const englishObj = response.find(item=>item.includes("English"));

    // const english =entitiesObj.slice("English".length,englishObj.length).trim()
    res
      .status(200)
      .json({ result: completion.data.choices[0].text, status: 200 })
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

async function getListOfFiles(req, res) {
  try {
    res.setHeader("Content-Type", "application/json")
    const response = await openai.listFiles()
    // res.status(200);
    const data = JSON.stringify(response.data)

    res.send(data)
  } catch (e) {
    res.status(500).json(e.message)
  }
}

async function createFile(req, res) {
  try {
    const response = await openai.createFile(
      fs.createReadStream("./input.jsonl"),
      "fine-tune"
    )

    const data = response.data
    res.send(data.id)
  } catch (e) {
    res.status(500).json(e)
  }
}
async function deleteFile(req, res) {
  try {
    const response = await openai.createFile(
      fs.createReadStream("./convertjson.jsonl"),
      "fine-tune"
    )

    const data = response.data
    res.send(data.id)
  } catch (e) {
    res.status(500).json(e)
  }
}
async function createFineTune(req, res) {
  try {
    const response = await openai.createFineTune({
      training_file: "file-QpBPkz8TYylhMqbWImov6Esq",
      model: "davinci",
    })

    const data = response.data
    res.send(data.id)
  } catch (e) {
    res.status(500).json(e)
  }
}
async function getfineTuneList(req, res) {
  try {
    const response = await openai.listFineTunes()

    const data = response.data
    res.send(data)
  } catch (e) {
    res.status(500).json(e)
  }
}
async function downloadFile(req, res) {
  try {
    const response = await openai.downloadFile("file-HdnnoObROncULk8kYOaMvrAt")

    const data = response.data
    res.send(data.id)
  } catch (e) {
    res.status(500).json(e)
  }
}

function generatePromptForKeywords(animal) {
  return `Translate the below statment to English then extract the keywords and entities
  show GCS_TEam@gcs workgroup\n\n${animal}`
}
