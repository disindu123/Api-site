const nexara = require("@dark-yasiya/nexara");
const cheerio = require('cheerio')
const axios = require("axios")
const CREATOR = "VAJIRA"


function replaceLastOccurrence(inputString, wordToReplace, replacement) {
    // Find the index of the last occurrence of the word
    var lastIndex = inputString.lastIndexOf(wordToReplace);

    if (lastIndex === -1) {
        // Word not found
        return inputString;
    }

    // Split the string into parts before and after the last occurrence
    var before = inputString.substring(0, lastIndex);
    var after = inputString.substring(lastIndex + wordToReplace.length);

    // Concatenate the parts with the replacement word
    return before + replacement + after;
}
function removeHtmlTags(text) {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
}

async function hirunews() {
    const url = `https://www.hirunews.lk/local-news.php?pageID=1`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);      
        const title = $("div:nth-child(2) > div.column.middle > div.all-section-tittle").text().trim()
        const link = $("div:nth-child(2) > div.column.left > div > a").attr("href")
        const date = $("div:nth-child(2) > div.column.middle > div.middle-tittle-time").text().trim()
        const img = $("img.middle-sm.img-fluid").attr("src")
        const response1 = await axios.get(link);  
        const $1 = cheerio.load(response1.data);
        const desc = $1("#article-phara2").text().trim()
if (link) return {            
                title,
                link,
                img,
                date,
                desc
                          
        };
   
}

async function sirasa() {
    try {
        const $ = await nexara('https://sinhala.newsfirst.lk/');
        const url = 'https://sinhala.newsfirst.lk' + $("div.main_div.top_stories a").attr('href');
        const g = await nexara(url);
        
        let desc = g('#testId').html();
        desc = removeHtmlTagss(desc.replaceAll('</p>\n', '\n\n').replaceAll('<p>', ''));
        
        return {
            title: $("div.top_stories_main h1").text(),
            image: g('#post_img').attr('src'),
            url,
            desc
        };
    } catch (error) {
        console.error({
            status: false,
            error: error.message
        });
    }
}





async function itn() {
const url = 'https://www.itnnews.lk/local/';
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const link = $("div.block-inner > div:nth-child(1) > div > h3 > a").attr("href")
const image = $("div.p-featured > a > img").attr("src")
const response1 = await axios.get(link);  
const $1 = cheerio.load(response1.data);
const title = $1("div.single-header-content.overlay-text > h1").text()
const date = $1("span.meta-el.meta-date > time").text()
const desc = $1("div.e-ct-outer > div > p").text()
if (link) return {            
                title,
                link,
                image,
                date,
                desc
                          
        };
   
}




async function siyatha() {
const url = 'https://siyathanews.lk/archives/category/local-news';
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const link = $("div.td-module-thumb > a").attr("href")
const image = $("div.td-module-thumb > a > img").attr("src")    
const response1 = await axios.get(link);  
const $1 = cheerio.load(response1.data);
const title = $1("div.td_block_wrap.tdb_title.tdi_34.tdb-single-title.td-pb-border-top.td_block_template_1 > div > h1").text()
const date = $1("#tdi_29 > div > div.vc_column.tdi_32.wpb_column.vc_column_container.tdc-column.td-pb-span6 > div > div.vc_row_inner.tdi_37.vc_row.vc_inner.wpb_row.td-pb-row > div > div > div > div.td_block_wrap.tdb_single_date.tdi_40.td-pb-border-top.td_block_template_1.tdb-post-meta > div > time").text()
const desc = $1("div.td_block_wrap.tdb_single_content.tdi_55.td-pb-border-top.td_block_template_1.td-post-content.tagdiv-type > div > p").text()
if (link) return {            
                title,
                link,
                image,
                date,
                desc
                          
        };
   
}


async function nethnews() {
const url = `https://nethnews.lk/`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const title = $('div > div:nth-child(2) > div > div.col-sm-9 > h3 > a').text()            
const link = $('div > div:nth-child(2) > div > div.col-sm-9 > h3 > a').attr('href')
const image = $('div.col-sm-3 > img').attr('src')
const response1 = await axios.get(link);  
const $1 = cheerio.load(response1.data);  
const date = $1('header > span > time').text()    
const desc = $1('div.td-post-content > p').text()
if (link) return {            
                title,
                link,
                image,
                date,
                desc
                          
        };
   
}

async function lnw() {
const url = `https://sinhala.lankanewsweb.net/`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const title = $("div.td_module_flex_6.td-animation-stack.td-big-grid-flex-post.td-big-grid-flex-post-0.td-cpt-post > div > div.td-module-meta-info > div.tdb-module-title-wrap > h3 > a").text()
const link = $("div.td-image-container > div > a").attr("href")
const response1 = await axios.get(link);  
const $1 = cheerio.load(response1.data);
const date = $1("div.tdb-block-inner.td-fix-index > time").text()
const desc = $1("div > p").text()
if (link) return {            
                title,
                link,
                date,
                desc
                          
        };
   
}


async function silumina() {
const url = `https://www.silumina.lk/`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
    const title = $("div.penci-ercol-66.penci-ercol-order-2.penci-sticky-ct.elementor-column.elementor-col-66.elementor-top-column.elementor-element.elementor-element-202cd2f > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div.pcbg-content > div > div > div.pcbg-heading.item-hover > h3 > a").text().trim()
    const date = $("div.penci-ercol-66.penci-ercol-order-2.penci-sticky-ct.elementor-column.elementor-col-66.elementor-top-column.elementor-element.elementor-element-202cd2f > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div.pcbg-content > div > div > div.grid-post-box-meta.pcbg-meta.item-hover > div > span > time").text()
    const link = $("div.pcbg-heading.item-hover > h3 > a").attr("href")
    const response1 = await axios.get(link);  
    const $1 = cheerio.load(response1.data); 
    const image = $1("div.post-image > a").attr("href")
    const desc = $1("div > #penci-post-entry-inner > p").text()
if (link) return {            
                title,
                link,
                image,
                date,
                desc
                          
        };
   
}


async function dasathalankanews() {
const url = `https://dasathalankanews.com/`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const link = $("h3.entry-title.td-module-title > a").attr("href")
const image = $("div.td-module-thumb > a > span").attr("data-bg")    
       const response1 = await axios.get(link);  
       const $1 = cheerio.load(response1.data);
       const title = $1("div > h1.tdb-title-text").text()       
       const date = $1("div > time").text()
       const desc = $1("div.td_block_wrap.tdb_single_content.tdi_24.td-pb-border-top.td_block_template_1.td-post-content.tagdiv-type > div > p").text()
if (link) return {            
                title,
                link,
                image,
                date,
                desc
                          
        };
   
}

async function gossiplankanews() {
const url = `https://www.gossiplankanews.com/?m=1`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);            
const link = $("h2.post-title > a").attr("href")
const response1 = await axios.get(link);  
const $1 = cheerio.load(response1.data);
const title = $1("h1.post-title").text().trim()
const date = $1("span.post-date.published").text().trim()
const image = $1("#Blog1 > div.blog-posts.hfeed.container.item-post-wrap > div.blog-post.hentry.item-post > div.post-item-inner > div.post-body.post-content > div.separator > img").attr("src")
const desc = $1("p").text()    
if (link) return {            
                title,
                link,
                image,
                date,
                desc
                          
        };
   
}


async function cricbuzz() {
const url = `https://m.cricbuzz.com/cricket-match/live-scores`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const title = $("div > div:nth-child(1) > a > div > span").text()
const link1 = $("div.flex.flex-col.gap-px > div > a").attr("href")
const link = `https://m.cricbuzz.com${link1}`
const response1 = await axios.get(link);  
const $1 = cheerio.load(response1.data);
const to_win = $1("div > div.my-2.text-cbLive").text()
const target = $1("div > div:nth-child(1) > span.text-black").text()
const crr = $1("div > div:nth-child(2) > span.text-black").text()
const req = $1("div > div:nth-child(3) > span.text-black").text()	
const score = $1("div.font-bold.text-center.text-3xl.flex.items-center.flex-row.h-full > div:nth-child(1)").text()
if (link) return {            
                title,
                link,
                to_win,
                target,
                crr,
                req,
                score
                          
        };
   
}



async function server() {
var link = `https://tdd-gangs.github.io/Movie-website/`
var response = await axios.get(link);
var $ = cheerio.load(response.data);

const desc = $('body > div.outer-wrap > div > main > section > article:nth-child(1) > a > div.post-content > p').text().trim()
const image = $('div > img').attr("src")

			
const info = {
details: desc,
image: image	
}
   return info
}



module.exports = { hirunews, sirasa, itn, siyatha, nethnews, lnw, silumina, dasathalankanews
                  , gossiplankanews, cricbuzz, server }
