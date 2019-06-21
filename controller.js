'use strict'

const response = require('./response');
const conn = require('./connect.js');

exports.getNotes = function (req, res) {
    let queryParams = {
        page: parseInt(req.query.page) || 1,
        search: req.query.search || "",
        sort: req.query.sort || "DESC",
        limit: parseInt(req.query.limit) || 10,
    }
    let totalData;
    let totalPage;
    let offset = (queryParams.page - 1) * queryParams.limit;

    conn.query(
        `select count(*) 'total' from notes inner join category  on category.id = notes.category where title like '%${queryParams.search}%'  `,
        function (error, rows, field) {
            totalData = rows[0].total
            totalPage = Math.ceil(Number(totalData) / queryParams.limit)
        }
    )
    conn.query(
        `select title,note,category.name 'category', DATE_FORMAT(time, '%m/%d/%Y %H:%i:%s') as 'date time' from notes inner join category  on category.id = notes.category where title like '%${queryParams.search}%' order by time ${queryParams.sort} limit ${queryParams.limit} offset ${offset} ;`,
        function (error, rows, field) {

            if (error) {
                throw error
            } else {
                if (rows.length == 0) {
                    return res.send({
                        message: "no record found"
                    })
                } else {
                    response.pagination(totalData, queryParams.page, totalPage, queryParams.limit, rows, res);
                }
            }
        }
    )
}


exports.getNotesById = function (req, res) {
    let id = req.params.id;

    conn.query(
        `select title,note,category.name 'category' from notes  inner join category  on category.id = notes.category where notes.id=?;`, [id],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                if (rows.length != 0) {
                    return res.send({
                        data: rows,
                    })
                } else {
                    return res.send({
                        message: "no record found"
                    })
                }
            }
        }
    )
}

exports.addNote = function (req, res) {
    let title = req.body.title;
    let note = req.body.note;
    let category = req.body.category;

    conn.query(
        `INSERT INTO notes SET title=?,note=?,category=?`, [title, note, category],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                return res.send({
                    error: false,
                    data: rows,
                    message: 'data created successfully!'
                })
            }
        }
    )
}

exports.patchNote = function (req, res) {

    let id = req.params.id;
    let title = req.body.title;
    let note = req.body.note;
    let category = req.body.category;
    conn.query(
        `UPDATE notes SET title=?,note=?,category=? WHERE id=?`, [title, note, category, id],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                return res.send({
                    error: false,
                    data: rows,
                    message: 'data updated successfully!'
                })
            }
        }
    )
}

exports.deleteNote = function (req, res) {
    let id = req.params.id;

    conn.query(
        `DELETE FROM notes WHERE id=?;`, [id],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                return res.send({
                    error: false,
                    data: rows,
                    message: 'data deleted!'
                })
            }
        }
    )
}

exports.addCategory = function (req, res) {
    let name = req.body.name;

    conn.query(
        `INSERT INTO category SET name=?;`, [name],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {

                return res.send({
                    message: "data created!"
                })
            }
        }
    )
}


exports.patchCategory = function (req, res) {
    let id = req.params.id;
    let name = req.body.name;

    conn.query(
        `UPDATE category SET name=? WHERE id=?;`, [name, id],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                return res.send({
                    message: "data updated!"
                })
            }
        }
    )
}

exports.deleteCategory = function (req, res) {
    let id = req.params.id;

    conn.query(
        `DELETE FROM category WHERE id=?;`, [id],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                return res.send({
                    message: "data deleted!"
                })
            }
        }
    )
}