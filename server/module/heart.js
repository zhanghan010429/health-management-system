/**
 * 心脏数据相关
 * @author: zhanghan
 * @since:  2023/3/10
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')

/**
 * 获取心脏数据
 */
router.post('/getHeart', async (req, res) => {
    const msg = req.body
    const { id, tableName } = msg;

    try {
        const result = await db(
            `select Mon, Tue, Wed, Thur, Fri, Sat, Sun from ${tableName} where id="${id}"`
        )
        if (result.length >= 1) {
            res.json({ code: 0, data: result[0], message: '成功' })
        } else {
            
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})

/**
 * 添加或者修改心脏数据
 */
router.post('/setHeart', async (req, res) => {
    const msg = req.body
    const { id, tableName, Mon, Tue, Wed, Thur, Fri, Sat, Sun } = msg;

    try {
        const result = await db(
            `select id from ${tableName} where id="${id}"`
        )
        if (result.length >= 1) {
            const update = await db(
                `update  ${tableName} set Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}" where id=${id}`
            )
            if (update) {
                res.json({ code: 1, data: null, message: '修改成功' })
            }
        } else {
            const inserted = db(
                `insert into  ${tableName} set id=${id}, Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}"`
            )
            if (inserted) res.json({ code: 0, data: null, message: '添加成功' })
            else res.json({ code: -1, data: null, message: '添加失败' })
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})

module.exports = router
