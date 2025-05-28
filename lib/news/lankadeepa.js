const axios = require("axios")
const cheerio = require("cheerio")
const nexara = require("@dark-yasiya/nexara")
const CREATOR = "Dark Yasiya"
require("dotenv").config()

module.exports = class Lankadeepa {
    constructor() {}

async search() {
    try {


   const $ = await nexara("https://www.lankadeepa.lk/");

    
    const list = []  
    $("#breakingnewsadss > div").each((i, el) => {

        const title = $(el).find("p").text().trim();
        const url = $(el).find("a").attr("href");
        const image = $(el).find("a > img").attr("src");
        list.push({title, image, url})
    })

    const $2 = await nexara(list[1].url)

    const title = $2("div.p-b-0 > h3").text().trim()
    const img = $2("div.header.inner-content.p-b-20 > p:nth-child(4) > img").attr("src")
    const date = $2("div.col-xl-8.col-lg-8.col-md-12.col-sm-12 > span > a:nth-child(1)").text().trim()
    const desc = $2("div.header.inner-content.p-b-20 > p").text().trim()

    const result = {

        title: title,
        date: date,
        image: list[1].image,
        url: list[1].url,
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
}}
