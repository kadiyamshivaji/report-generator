"use strict"
const { Configuration, OpenAIApi } = require("openai")
const fs = require("fs")
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
var util = require("util")

module.exports = {
  getListOfFiles: getListOfFiles,
  createFile: createFile,
  deleteFile: deleteFile,
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
      fs.createReadStream("./api/data/crazycarsdatav3.jsonl"),
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
    const id = req.swagger.params.fileId.value || ""
    const response = await openai.deleteFile(id)

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
