import express from "express";

const router =  express.Router() // get access to express router
router.route('/').get((req, res) => res.send("Hello World"))
export default router