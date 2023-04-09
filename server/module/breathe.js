/**
 * 登录、注册相关
 * @author zhanghan
 * @since  2023/03/24
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')
const crypto = require('crypto')

/**
 * 获取呼吸频率数据
 */
router.post('/getBreatheData', async (req, res) => {
    const msg = req.body
    const { id } = msg;

    try {
        const result = await db(
            `select Mon, Tue, Wed, Thur, Fri, Sat, Sun from respiratory_rate where id="${id}"`
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
 * 添加或者修改呼吸频率数据
 */
router.post('/setBreatheData', async (req, res) => {
    const msg = req.body
    const { id, Mon, Tue, Wed, Thur, Fri, Sat, Sun } = msg;

    try {
        const result = await db(
            'select id from respiratory_rate where id="' + id + '"'
        )
        if (result.length >= 1) {
            const update = await db(
                `update respiratory_rate set Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}" where id=${id}`
            )
            if (update) {
                res.json({ code: 1, data: null, message: '修改成功' })
            }
        } else {
            const inserted = db(
                `insert into respiratory_rate set id=${id}, Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}"`
            )
            if (inserted) res.json({ code: 0, data: null, message: '添加成功' })
            else res.json({ code: -1, data: null, message: '添加失败' })
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})


/**
 * 获取血氧数据
 */
router.post('/getBloodOxygenData', async (req, res) => {
    const msg = req.body
    const { id } = msg;

    try {
        const result = await db(
            `select Mon, Tue, Wed, Thur, Fri, Sat, Sun from blood_oxygen where id="${id}"`
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
 * 添加或者修改血氧数据
 */
router.post('/setBloodOxygenData', async (req, res) => {
    const msg = req.body
    const { id, Mon, Tue, Wed, Thur, Fri, Sat, Sun } = msg;

    try {
        const result = await db(
            'select id from blood_oxygen where id="' + id + '"'
        )
        if (result.length >= 1) {
            const update = await db(
                `update blood_oxygen set Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}" where id=${id}`
            )
            if (update) {
                res.json({ code: 1, data: null, message: '修改成功' })
            }
        } else {
            const inserted = db(
                `insert into blood_oxygen set id=${id}, Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}"`
            )
            if (inserted) res.json({ code: 0, data: null, message: '添加成功' })
            else res.json({ code: -1, data: null, message: '添加失败' })
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})


/**
 * 获取肺活量数据
 */
router.post('/getVitalApacityData', async (req, res) => {
    const msg = req.body
    const { id } = msg;

    try {
        const result = await db(
            `select Mon, Tue, Wed, Thur, Fri, Sat, Sun from vital_apacity where id="${id}"`
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
 * 添加或者修改肺活量数据
 */
router.post('/setVitalApacityData', async (req, res) => {
    const msg = req.body
    const { id, Mon, Tue, Wed, Thur, Fri, Sat, Sun } = msg;

    try {
        const result = await db(
            'select id from vital_apacity where id="' + id + '"'
        )
        if (result.length >= 1) {
            const update = await db(
                `update vital_apacity set Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}" where id=${id}`
            )
            if (update) {
                res.json({ code: 1, data: null, message: '修改成功' })
            }
        } else {
            const inserted = db(
                `insert into vital_apacity set id=${id}, Mon="${Mon}", Tue="${Tue}", Wed="${Wed}", Thur="${Thur}", Fri="${Fri}", Sat="${Sat}", Sun="${Sun}"`
            )
            if (inserted) res.json({ code: 0, data: null, message: '添加成功' })
            else res.json({ code: -1, data: null, message: '添加失败' })
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: err })
    }
})

module.exports = router
