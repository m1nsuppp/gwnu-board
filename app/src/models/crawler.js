"use strict";

const getHTML = async (_URL) => {
  const axios = require('axios'); 
  
  try {
    return await axios.get(_URL);
  } catch(error) {
    console.log(error);
  };
};

const parsing = async (_URL) => {
  const cheerio = require('cheerio'); 
  const html = await getHTML(_URL);
  const $ = cheerio.load(html.data);
  const $tr = $('tr');
  const deptURL = _URL.replace(/[0-9]/g, '').replace('/subview.do', 'index.do');
  const deptHTML = await getHTML(deptURL);
  const $dept = cheerio.load(deptHTML.data);
  const maxTitleLength = 70;
  const notices = [];
  let domain = new URL(_URL).origin;

  $tr.each((i, el) => {
    let dept = $dept('head > title').text();
    let artclTdTitle = $(el).find('._artclTdTitle').text().replace('새글', '').trim();
    let artclTdLink = domain + $(el).find('a').attr('href');
    let artclTdRdate = $(el).find('._artclTdRdate').text().trim();

    // `https://${URL}.gwnu.ac.kr${artclTdLink}`;

    if (artclTdTitle.length < maxTitleLength) {
      notices.push([
        dept,
        artclTdTitle,
        artclTdLink,
        artclTdRdate,
      ]);
    }
  });
  
  notices.shift();

  return notices;
};



module.exports = {
  getHTML,
  parsing,
};
