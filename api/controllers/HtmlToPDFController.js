"use strict"
const fs = require("fs")
const { Configuration, OpenAIApi } = require("openai");
const pdf = require('pdf-parse');
const pdfFilePath =  "./pega_knowledge_8.8_9-27-2023.pdf";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
var util = require("util")
const puppeteer = require("puppeteer")

module.exports = {
  htmlToPdf: htmlToPdf,
  pdfToSumary:pdfToSumary
}
function sliceStringToMaxTokens(inputString, maxTokens) {
  // Split the input string into words or tokens
  const tokens = inputString.split(' ');

  let slicedStrings = [];
  let currentString = '';

  // Iterate through the tokens and add them to the currentString until it reaches maxTokens
  for (const token of tokens) {
    if ((currentString + token).length <= maxTokens) {
      currentString += (currentString === '' ? '' : ' ') + token;
    } else {
      slicedStrings.push(currentString);
      currentString = token;
    }
  }

  // Push any remaining part of the string
  if (currentString !== '') {
    slicedStrings.push(currentString);
  }

  return slicedStrings;
}

const inputString = "This is a sample string that we want to slice into smaller pieces with a maximum token limit of 25 tokens.";
const maxTokens = 250;



async function htmlToPdf(req,res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  try {
    const { htmlcode, orientation, headerTemplate, footerTemplate, size ,fileName} =
      req.body

    console.log(
      "params",
      htmlcode,
      orientation,
      headerTemplate,
      footerTemplate,
      size,

    )
 await fs.writeFile ('index.html', htmlcode, (err) => {
      if (err) {
          if (err) throw err
          console.log ('created')

      }else{
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
         
      }
  })
    // Launch a headless browser
    const browser = await puppeteer.launch({ headless: "new" })
    // Create a new page
    const page = await browser.newPage()

    // URL or HTML content to be converted to PDF
    //     const htmlContent = `
    //    <!DOCTYPE html>
    //    <html>
    //    <head>
    //    <style>
    //    footer{
    //              background-color: red;
    //              width: 100%;
    //              position: absolute;
    //              bottom: 0;
    //              left: 0;
    //              right: 0;
    //              display: flex;
    //              flex-direction: column;
    //              justify-content: center;
    //              align-items: center;
    //          }
    //   </style>
    //      <title>HTML to PDF Conversion مرحبا بالعالم</title>
    //    </head>
    //    <body>
    //    <div
    //    className="container"
    //    id="pdfContent"
    //  >
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by مرحبا بالعالم</p>
    //        <img
    //          src="https://www.w3schools.com/html/pic_trulli.jpg"
    //          alt="logo"
    //          height="200"
    //          width="300"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT 你好世界</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="section a4-size">
    //      <div className="part1">
    //        <p className="audit"> CSR Audit conducted by</p>
    //        <img
    //          src="/images/logo-medium.PNG"
    //          alt="logo"
    //        />
    //        <hr />
    //        <p className="text1">CSR AUDIT REPORT</p>
    //        <p className="text2">Based on ISO 26000</p>
    //        <hr />
    //      </div>
    //      <div className="part2">
    //        <div className="details bgColor">
    //          <span className="text3">Supplier</span>
    //          <span className="text3">Sector</span>
    //          <span className="text3">Activity</span>
    //          <span className="text4">Month:</span>
    //        </div>

    //        <div className="logo-p">
    //          <span></span>
    //        </div>
    //      </div>
    //    </div>
    //  </div>
    //    </body>
    //    <footer>
    // <p>this is footer</p>
    // </footer>
    //    </html>
    //  `

    // Navigate to the HTML content
    await page.setContent('/index.html', { waitUntil: "domcontentloaded" })

    // Set up options for PDF generation
    const pdfOptions = {
      path: `${fileName}.pdf`, // Output file path
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: `<div style="border-bottom: solid 1px #bbb; width: 100%; font-size: 9px;
      padding: 5px 5px 0; color: #bbb; ">
      <div style=" left: 5px; top: 5px;">${headerTemplate}</div>
  </div>`,
      footerTemplate: `
 <div style="border-top: solid 1px #bbb; width: 100%; font-size: 9px;
     padding: 5px 5px 0; color: #bbb; position: relative;">
     <div style="position: absolute; left: 5px; top: 5px;"><span class="date"></span>
     ${footerTemplate}</div>
     <div style="position: absolute; right: 5px; top: 5px;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>
 </div>
`,
      // this is needed to prevent content from being placed over the footer
      margin: { bottom: "70px", top: "70px" },
    }
    // Disable lazy loading of images on the page
    await page.setBypassCSP(true)

    // await page.goto("https://www.w3schools.com/html/pic_trulli.jpg", {
    //   waitUntil: "networkidle0",
    // })

    // Generate the PDF
    await page.pdf(pdfOptions)

    console.log("PDF generated successfully.")

    // Close the browser
    await browser.close()
  } catch (err) {
    console.error("Error converting HTML to PDF:", err)
  }

  // return res
}

async function pdfToSumary(req, res) {
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
    const dataBuffer = fs.readFileSync(pdfFilePath);

    pdf(dataBuffer).then(async function(data) {
      const textContent = data.text.replace(/(\r\n|\n|\r)/gm, "")
      
      const slicedStrings = sliceStringToMaxTokens(textContent, maxTokens);
      console.log(slicedStrings);
      const completion = await openai.createCompletion({
        model: process.env.MODEL,
      prompt: `please provide the summary points from  below statement\n${slicedStrings} ->`,
        // prompt: `${prompt} ->`,
        max_tokens: 250,
        temperature: 0,
        top_p: 1,
        stop: " END",
      })
      
      const openaiResponse = completion.data.choices[0].text
    
     
  
      
  
      res.status(200).send(textContent)
      console.log(textContent);
    }).catch(function(error) {
      console.error(error);
    });
   
  } catch (error) {
   
  }
}