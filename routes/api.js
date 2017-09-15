const express = require("express");
const router = express.Router();
const Note = require("../model/note").Note;

/* GET /notes */
router.get("/notes", (req, res, next) => {
    console.log("notes")
    res.send({
        status: 0,
        data: {
            opt1: {
                id: 11,
                text: "22"
            }
        }
    })

});

/* POST /notes/add */
router.post("/notes/add", (req, res, next) => {
    console.log("add...")
});

/* POST /notes/edit */
router.post("/notes/edit", (req, res, next) => {
    console.log("edit...")
});

/* POST /notes/delete */
router.post("/notes/delete", (req, res, next) => {
    console.log("delete")
});

module.exports = router;
