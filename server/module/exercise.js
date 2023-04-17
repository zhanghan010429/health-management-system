/**
 * 运动数据相关
 * @author: zhanghan
 * @since:  2023/3/13
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')

/**
 * 获取步数数据
 */
router.post('/getExerciseStep', async (req, res) => {
    const msg = req.body
    const { id } = msg;

    try {
        const result = await db(
            `select Mon, Tue, Wed, Thur, Fri, Sat, Sun from step_num where id="${id}"`
        )
        if (result.length >= 1) {
            res.json({ code: 0, data: result[0], message: '成功' })
        } else {
            res.json({ code: 0, data: [], message: '成功' })
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})

/**
 * 添加或者修改步数数据
 */
router.post('/setExerciseStep', async (req, res) => {
    const msg = req.body
    const { id, Mon, Tue, Wed, Thur, Fri, Sat, Sun } = msg;

    try {
        const result = await db(
            'select id from step_num where id="' + id + '"'
        )
        if (result.length >= 1) {
            const update = await db(
                `update step_num set Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}" where id=${id}`
            )
            if (update) {
                res.json({ code: 1, data: null, message: '修改成功' })
            }
        } else {
            const inserted = db(
                `insert into step_num set id=${id}, Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}"`
            )
            if (inserted) res.json({ code: 0, data: null, message: '添加成功' })
            else res.json({ code: -1, data: null, message: '添加失败' })
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})



/**
 * 获取卡路里数据
 */
router.post('/getCalorie', async (req, res) => {
    const msg = req.body
    const { id } = msg;

    try {
        const result = await db(
            `select Mon, Tue, Wed, Thur, Fri, Sat, Sun from burn_calories where id="${id}"`
        )
        if (result.length >= 1) {
            res.json({ code: 0, data: result[0], message: '成功' })
        } else {
            res.json({ code: 0, data: [], message: '成功' })
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})

/**
 * 添加或者修改卡路里数据
 */
router.post('/setCalorie', async (req, res) => {
    const msg = req.body
    const { id, Mon, Tue, Wed, Thur, Fri, Sat, Sun } = msg;

    try {
        const result = await db(
            'select id from burn_calories where id="' + id + '"'
        )
        if (result.length >= 1) {
            const update = await db(
                `update burn_calories set Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}" where id=${id}`
            )
            if (update) {
                res.json({ code: 1, data: null, message: 'Modify Successfully!' })
            }
        } else {
            const inserted = db(
                `insert into burn_calories set id=${id}, Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}"`
            )
            if (inserted) res.json({ code: 0, data: null, message: '添加成功' })
            else res.json({ code: -1, data: null, message: '添加失败' })
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})

module.exports = router
