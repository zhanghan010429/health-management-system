/**
 * 运动数据相关
 * @author: zhanghan
 * @since:  2023/3/13
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')

/**
 * 获取运动数据
 */
router.get('/getExerciseStep', async (req, res) => {
    try {
        const { id } = req.query
        const data = await db('select *, from step_num where id="' + id + '"')
        res.json({ code: 0, data, message: '' })
    } catch (e) {
        res.json({ code: -1, data: null, message: e })
    }
})

module.exports = router
