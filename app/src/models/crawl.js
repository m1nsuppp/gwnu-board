"use strict";

const URL = 'https://ee.gwnu.ac.kr/ee2/31950/subview.do'; 

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
  const $articleList = $('._artclTdTitle');
  const maxTitleLength = 70;
  const notices = [];

  $articleList.each((idx, node) => {
    let articleTdTitle = $(node).find('a').text().trim();
    let articleTdLink = $(node).find('a').attr('href');
    
    if (articleTdTitle.length < maxTitleLength) {
      notices.push([
        '전자공학과',
        articleTdTitle,
        `https://ee.gwnu.ac.kr${articleTdLink}`,
      ]); 
    }
  });

  return notices;
};

const insIntoDB = async (URL) => {
  const mySQL = require('mysql2');
  const dbConfig = require('./../db/db_config.json');
  const db = mySQL.createConnection(dbConfig);
  const notices = await parsing(URL);
  const sql = `insert into notices (dept, title, link) values ?;`;

  db.query(sql, [notices], (error, result) => {
    if (error) throw error;
    db.end();
  });
};

insIntoDB(URL);
