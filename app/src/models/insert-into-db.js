const GwnuURL = require('./GwnuURL');
const crawler = require('./crawler');

const insertIntoDB = async (_URL) => {
  const mySQL = require('mysql2');
  const dbConfig = require('./../db/db-config.json');
  const db = mySQL.createConnection(dbConfig);
  const notices = await crawler.parsing(_URL);
  const sql = `insert into notices (dept, title, link, date) values ?;`;

  db.query(sql, [notices], (error, result) => {
    if (error) throw error;
    db.end();
  });
};

const eachURLCrawl = () => {
  const GwnuURLs = new GwnuURL();
  const URLs = GwnuURLs.getURLs();

  URLs.forEach((URL) => {
    for (let dept in URL) {
      insertIntoDB(URL[dept]);
    }
  });
};

eachURLCrawl();