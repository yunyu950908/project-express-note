const express = require("express");
const router = express.Router();
const Note = require("../model/note").Note;

/* GET /notes */
router.get("/notes", (req, res, next) => {
    Note.findAll({
        raw: true
    }).then((notes) => {
        res.send({
            status: 0,
            data: notes
        });
        console.log("get all")
    }).catch(err => {
        res.send({
            status: 1,
            errorMsg: "获取失败，数据库故障"
        });
        console.log("add failed", err)
    });
});

/* POST /notes/add */
router.post("/notes/add", (req, res, next) => {
    let note = req.body.note;
    Note.create({text: note}).then(() => {
        res.send({status: 0});
        console.log("add success", note)
    }).catch(err => {
        res.send({
            status: 1,
            errorMsg: "添加失败，数据库故障"
        });
        console.log("add failed", err)
    });
});

/* POST /notes/edit */
router.post("/notes/edit", (req, res, next) => {
    Note.update({
        text: req.body.note
    }, {
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.send({status: 0});
        console.log("edit success");
    }).catch(err => {
        res.send({
            status: 1,
            errorMsg: "更新失败，数据库故障"
        });
        console.log("edit failed", err)
    });
});

/* POST /notes/delete */
router.post("/notes/delete", (req, res, next) => {
    Note.destroy({where: {id: req.body.id}}).then(() => {
        res.send({status: 0})
        console.log("delete success");
    }).catch(err => {
        res.send({
            status: 1,
            errorMsg: "更新失败，数据库故障"
        });
        console.log("edit failed", note)
    });
});

module.exports = router;
