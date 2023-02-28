"use strict"
const { Configuration, OpenAIApi } = require("openai")
const fs = require("fs")
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

var util = require("util")

module.exports = {
  createFineTune: createFineTune,
  getfineTuneList: getfineTuneList,
  deleteFineTune:deleteFineTune
}


async function createFineTune(req, res) {
  try {
    
  const id = req.swagger.params.fileId.value || ""
    const response = await openai.createFineTune({
      training_file: id,
      model: "davinci",
    })

    const data = response.data
    res.send(data)
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
async function deleteFineTune(req, res) {
    try {
      const model = req.swagger.params.deleteFineTunedModel.value || ""
      const response = await openai.deleteModel(model);
      
    const data = response.data
    res.send(data)
    } catch (e) {
      res.status(500).json(e)
    }
  }


