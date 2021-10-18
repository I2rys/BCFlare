//Dependencies
const BCFlare = require("../index.js")

//Main
// Get()
async function Get(){
    const body = await BCFlare.get("https://udemy.com/")

    console.log(body)
}

// Post()
async function Post(){
    const body = await BCFlare.post("https://udemy.com/")

    console.log(body)
}
