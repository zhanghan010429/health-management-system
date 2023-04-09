/**
 * 心脏数据相关
 * @author: zhanghan
 * @since:  2023/3/10
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')

/**
 * 获取文章数据
 */
router.post('/getArticle', async (req, res) => {
    const msg = req.body
    try {
        const result = await db(
            `select * from article`
        )
        if (result.length >= 1) {
            res.json({ code: 0, data: result, message: '成功' })
        } else {
            
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})

/**
 * 添加或者修改文章数据
 */
router.post('/setArticle', async (req, res) => {
    const msg = req.body
    const { id, content } = msg;

    try {
        const result = await db(
            `select name from basic_info where id="${id}"`
        )
        const name = result[0].name;
       
        const inserted = db(
            `insert into article set uid="${id}", u_name="${name}", content="${content}"`
        )
        if (inserted) res.json({ code: 0, data: null, message: '分享成功' })
        else res.json({ code: -1, data: null, message: '分享失败' })
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})

/**
 * 添加或者修改文章数据
 */
router.post('/editArticle', async (req, res) => {
    const msg = req.body
    const { id, content } = msg;
    try {
        const update = db(
            `update article set content="${content}" where id="${id}"`
        )
        if (update) res.json({ code: 0, data: null, message: '修改成功' })
        else res.json({ code: -1, data: null, message: '修改失败' })
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})

/**
 * 获取文章数据
 */
router.post('/getArticleById', async (req, res) => {
    const msg = req.body
    const { id } = msg;

    try {
        const result = await db(
            `select content from article where id="${id}"`
        )
        const content = result[0].content;
        if (content) res.json({ code: 0, data: content, message: '获取成功' })
        else res.json({ code: -1, data: null, message: '获取失败' })
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})

module.exports = router
