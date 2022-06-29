"use strict";

const boards = require("../../db/db");

const index = (req, res) => {
  const sql = `select * from notices`;

  boards.query(sql, (err, result) => {
    if (err) throw err;
    const notices = [];

    for (let data of result) {
      notices.push({
        id: data.id,
        dept: data.dept,
        title: data.title,
        link: data.link,
      });
    }
    res.render('home/index', { notices: notices });    
  });

};

module.exports = {
  index,
};