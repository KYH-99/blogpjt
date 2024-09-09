const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");



router.get(["/", "/home"], asyncHandler( async (req, res) => {
    const locals = {
        title: "Home"
    };
    const data = await Post.find();
    res.render("index",{locals, data,  layout: mainLayout});
}));


router.get("/about", (req, res) => {
    const locals = {
        title: "About"
    }
    res.render("about",{locals, layout: mainLayout});
});

/**
 * 게시물 상세보기 
 * GET /post/:id
 */
router.get(
    "/post/:id",
    asyncHandler(async (req, res) => {
        const data = await Post.findById(req.params.id);  // ID로 게시물 찾기
        if (!data) {
            return res.status(404).send("게시물을 찾을 수 없습니다.");
        }
        res.render("post", { data, layout: mainLayout });
    })
); 

router.get("/category/:category", asyncHandler(async (req, res) => {
    const locals = {
        title: req.params.category
    };
    
    const data = await Post.find({ category: req.params.category.toLowerCase() });
    res.render("index", { locals, data, layout: mainLayout });
}));



module.exports = router;

