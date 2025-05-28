const axios = require("axios")
const nexara = require("@dark-yasiya/nexara")
const cheerio = require("cheerio")
require("dotenv").config()
const CREATOR = "VajiraTreh"

async function deranaNewsList() {
    try {

    const $ = await nexara("https://sinhala.adaderana.lk/sinhala-hot-news.php")

    
    const news = []
    
    $("body > main > div > div > div.col-xs-12.col-sm-8.col-lg-7 > div").each((i, el) => {
        const title = $(el).find("div.story-text > h2 > a").text();
        const desc = $(el).find("div.story-text > p").text();
        const date = $(el).find("div.story-text > div.comments > span").text().trim()
        const urls = $(el).find("div.story-text > div.thumb-image > a").attr("href")
        const url = "https://sinhala.adaderana.lk/" + urls
        const image = $(el).find("div.story-text > div.thumb-image > a > img").attr("src")
        news.push({title, image, date, url, desc})
    })

  

    const result = {
        data: news
        } 
        
    

    if (news.length === 0) {
        console.log("No News found.");
    } else {
        //console.log("Movies found:", movies.length);
        return result
    }
    
    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error
        }
    }
}

//=====================================================

async function deranaLatestNews() {
    try {
 
        const lastnews = await deranaNewsList()
        const ost = lastnews.data[0].url
        const $ = await nexara(ost);

        const title = $("body > main > div > div > div > article > h1").text()
        const desc = $("body > main > div > div > div > article > div > p").text()
        const image = $("body > main > div > div > div > article > div > img").attr("src")
        const date = lastnews.result[0].date //$("body > main > div > div > div > article > p").text()
        const url = ost


        const result = {
            
                title: title,
                desc: desc,
                image: image,
                date: date,
                url: url
            
        };

        // console.dir(result, { depth: null, colors: true });
        return result

    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error.message
        };
        console.log(errors);
    }
}


//=====================================================

async function deranaGetLink(query) {
    try {
        const https = /^https:\/\/[^\s/$.?#].[^\s]*$/;
        if (!query || !https.test(query)) {
            console.log("Invalid URL. Please provide a valid HTTPS URL.");
           // console.log("මොකක්ද මනුස්සයෝ කරන්නෙ SinhalaSub.lk FILM URL එකක් දාපන්");
            return;
        }
 

        const $ = await nexara(query);

        const title = $("body > main > div > div > div > article > h1").text()
        const desc = $("body > main > div > div > div > article > div > p").text()
        const image = $("body > main > div > div > div > article > div > img").attr("src")
        const date = $("body > main > div > div > div > article > p").text().trim()
        const url = query

        const result = {
            status: true,
            creator: CREATOR,
            data: {
                title: title,
                desc: desc,
                image: image,
                date: date,
                url: url
            }
        };

        // console.dir(result, { depth: null, colors: true });
        return result

    } catch (error) {
        const errors = {
            status: false,
            creator: CREATOR,
            error: error.message
        };
        console.log(errors);
    }
}

module.exports = { deranaNewsList, deranaGetLink, deranaLatestNews }
