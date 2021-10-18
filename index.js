//Dependencies
const Puppeteer_Stealth = require("puppeteer-extra-plugin-stealth")
const Puppeteer = require("puppeteer-extra")

///Configurations
//Puppeteer
Puppeteer.default.use(Puppeteer_Stealth())

//Main
async function get(url, headers = "", useragent = ""){
    return new Promise(async(resolve) =>{
        const browser = await Puppeteer.default.launch({ headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
        const page = await browser.newPage()

        if(headers){
            await page.setExtraHTTPHeaders(headers)
        }

        if(useragent){
            await page.setUserAgent(useragent)
        }

        await page.goto(url, { waitUntil: "networkidle0" })

        const page_content = await page.content()

        await browser.close()
        resolve(page_content)
    })
}

async function post(url, post_body = "",headers = "", useragent = ""){
    return new Promise(async(resolve) =>{
        const browser = await Puppeteer.default.launch({ headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
        const page = await browser.newPage()

        if(headers){
            await page.setExtraHTTPHeaders(headers)
        }

        if(useragent){
            await page.setUserAgent(useragent)
        }

        await page.setRequestInterception(true);

        page.on("request", ir=>{
            var data = {
                "method": "POST",
                "postData": post_body
            }
    
            ir.continue(data)
        })

        await page.goto(url, { waitUntil: "networkidle0" })

        const page_content = await page.content()

        await browser.close()
        resolve(page_content)
    })
}

//Exporter
module.exports = {
    get: get,
    post: post
}
