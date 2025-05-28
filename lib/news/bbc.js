const axios = require("axios")
const cheerio = require("cheerio")
const nexara = require("@dark-yasiya/nexara")
const CREATOR = "Dark Yasiya"
require("dotenv").config()

module.exports = class Bbc {
    constructor() {}

async news() {
    try {


        const $ = await nexara("https://www.bbc.com/sinhala");

    
    const list = []  
    $("ul.bbc-1rrncb9 > li").each((i, el) => {

        const title = $(el).find("div.promo-text > h3 > a").text().trim();
        const image = $(el).find("img").attr("src");
        const url = $(el).find("a").attr("href");
        list.push({title, image, url})
    })


    const $2 = await nexara(list[0].url)

    const title = $2("head > title").text()
    const image = $2("div.bbc-j1srjl > img").attr("src")
    const desc = $2("div.bbc-19j92fr.ebmt73l0").text()

    const result = {
        title: title,
        image: image,
        url: list[0].url,
        desc: desc
        } 
        
    
        return result
 
    
    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error
        }
    }
}


}
