/**
 * 心脏数据相关
 * @author: zhanghan
 * @since:  2023/3/10
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')

/**
 * 获取血压
 */
router.get('/getHeartRate', async (req, res) => {
    try {
        const { id } = req.query
        const data = await db('select *, from heart_rate where id="' + id + '"')
        res.json({ code: 0, data, message: '' })
    } catch (e) {
        res.json({ code: -1, data: null, message: e })
    }
})

module.exports = router
