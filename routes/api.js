const express = require("express");
const router = express.Router();
const Note = require("../model/note").Note;

/* GET /notes */
router.get("/notes", (req, res, next) => {
    const opts = {raw: true};
    if (req.session && req.session.user) {
        opts.where = {uid: req.session.user.id}
    }
    Note.findAll({raw: true}).then((notes) => {
        res.send({
            status: 0,
            data: notes
        });
        console.log("---- get all ----")
        console.log(notes)
    }).catch(err => {
        res.send({
            status: 1,
            errorMsg: "获取失败，数据库故障"
        });
        console.log("---- add failed ----", err)
    });
});

/* POST /notes/add */
router.post("/notes/add", (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.send({status: 1, errorMsg: "请先登录"})
    }
    if (!req.body.note) {
        return res.send({status: 2, errorMsg: "内容不能为空"})
    }

    let note = req.body.note;
    let uid = req.session.user.id;
    Note.create({text: note, uid: uid}).then(() => {
        res.send({status: 0});
        console.log("---- add success ----", note)
        // console.log(arguments)
    }).catch(err => {
        res.send({
            status: 1,
            errorMsg: "数据库异常或暂无权限"
        });
        console.log("---- add failed ----", err)
    });
});

/* POST /notes/edit */
router.post("/notes/edit", (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.send({status: 1, errorMsg: "请先登录"})
    }
    let noteId = req.body.id;
    let note = req.body.note;
    let uid = req.session.user.id;
    Note.update(
        {text: note},
        {where: {id: noteId, uid: uid}})
        .then(() => {
            res.send({status: 0});
            console.log("---- edit success ----");
        }).catch(err => {
        res.send({
            status: 1,
            errorMsg: "数据库异常或暂无权限"
        });
        console.log("---- edit failed ----", err)
    });
});

/* POST /notes/delete */
router.post("/notes/delete", (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.send({status: 1, errorMsg: "请先登录"})
    }
    let noteId = req.body.id;
    let uid = req.session.user.id;

    Note.destroy({where: {id: noteId, uid: uid}}).then((deleteLen) => {
        if (deleteLen === 0) {
            return res.send({status: 1, errorMsg: '你没有权限'});
        }
        res.send({status: 0});
        console.log("---- delete success ----");
    }).catch(err => {
        res.send({
            status: 1,
            errorMsg: "数据库异常或暂无权限"
        });
        console.log("---- edit failed ----", note)
    });
});

module.exports = router;
