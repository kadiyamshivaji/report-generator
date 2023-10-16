const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
  try {
    const data = "<span>hello world</span>";
    fs.writeFile ('index.html', data, (err) => {
      console.log (data)
      if (err) {
          if (err) throw err
          console.log ('created')

      }
  })
    // Launch a headless browser
    const browser = await puppeteer.launch({headless: 'new'});
    // Create a new page
    const page = await browser.newPage();

    // URL or HTML content to be converted to PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
      footer{
                background-color: red;
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
     </style>
        <title>HTML to PDF Conversion مرحبا بالعالم</title>
      </head>
      <body>
      <div
      className="container"
      id="pdfContent"
    >
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by مرحبا بالعالم</p>
          <img
            src="https://www.w3schools.com/html/pic_trulli.jpg"
            alt="logo"
            height="200"
            width="300"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT 你好世界</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
      <div className="section a4-size">
        <div className="part1">
          <p className="audit"> CSR Audit conducted by</p>
          <img
            src="/images/logo-medium.PNG"
            alt="logo"
          />
          <hr />
          <p className="text1">CSR AUDIT REPORT</p>
          <p className="text2">Based on ISO 26000</p>
          <hr />
        </div>
        <div className="part2">
          <div className="details bgColor">
            <span className="text3">Supplier</span>
            <span className="text3">Sector</span>
            <span className="text3">Activity</span>
            <span className="text4">Month:</span>
          </div>

          <div className="logo-p">
            <span></span>
          </div>
        </div>
      </div>
    </div>
      </body>
      <footer>
 <p>this is footer</p>
</footer>
      </html>
    `;

    // Navigate to the HTML content
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // Set up options for PDF generation
    const pdfOptions = {
      path: 'output.pdf', // Output file path
      format: 'A4',
    displayHeaderFooter: true,
    headerTemplate: `<div style="border-top: solid 1px #bbb; width: 100%; font-size: 9px;
    padding: 5px 5px 0; color: #bbb; position: relative;">
   
    <span>this is header</span>
</div>`,
    footerTemplate: `
    <div style="border-top: solid 1px #bbb; width: 100%; font-size: 9px;
        padding: 5px 5px 0; color: #bbb; position: relative;">
        <div style="position: absolute; left: 5px; top: 5px;"><span class="date"></span></div>
        <div style="position: absolute; right: 5px; top: 5px;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>
    </div>
  `,
    // this is needed to prevent content from being placed over the footer
    margin: { bottom: '70px',top: '70px'  },

    };
   // Disable lazy loading of images on the page
    await page.setBypassCSP(true);
    
    await page.goto('https://www.w3schools.com/html/pic_trulli.jpg', { waitUntil: 'networkidle0' });
    
    // Generate the PDF
    await page.pdf(pdfOptions);

    console.log('PDF generated successfully.');

    // Close the browser
    await browser.close();
  } catch (err) {
    console.error('Error converting HTML to PDF:', err);
  }
})();
