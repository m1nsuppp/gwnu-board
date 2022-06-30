"use strict";

const getHTML = async (URL) => {
  const axios = require('axios'); 
  
  try {
    return await axios.get(URL);
  } catch(error) {
    console.log(error);
  };
};

const parsing = async (URL) => {
  const cheerio = require('cheerio'); 
  const html = await getHTML(URL);
  const $ = cheerio.load(html.data);
  const $tr = $('tr');
  const maxTitleLength = 70;
  const notices = [];

  $tr.each((i, el) => {
    let artclTdTitle = $(el).find('._artclTdTitle').text().replace('새글', '').trim();
    let artclTdLink = $(el).find('a').attr('href');
    let artclTdRdate = $(el).find('._artclTdRdate').text().trim();

    if (artclTdTitle.length < maxTitleLength) {
      notices.push([
        '전자공학과',
        artclTdTitle,
        `https://ee.gwnu.ac.kr${artclTdLink}`,
        artclTdRdate,
      ]);
    }
  });
  
  notices.shift();

  return notices;
};

const insIntoDB = async (URL) => {
  const mySQL = require('mysql2');
  const dbConfig = require('./../db/db-config.json');
  const db = mySQL.createConnection(dbConfig);
  const notices = await parsing(URL);
  const sql = `insert into notices (dept, title, link, date) values ?;`;

  db.query(sql, [notices], (error, result) => {
    if (error) throw error;
    db.end();
  });
};

module.exports = {
  getHTML,
  parsing,
  insIntoDB,
};
