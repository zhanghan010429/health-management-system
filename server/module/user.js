/**
 * 用户相关
 * @author: zhanghan
 * @since:  2023/3/10
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')

/**
 * 获取用户基本信息
 */

router.get('/info', async (req, res) => {
    try {
        const { id } = req.query
        const [data] = await db('select * from basic_info where id="' + id + '"')
        if (data) {
            res.json({ code: 0, data, message: '' })
        } else {
            res.json({ code: -1, data: null, message: '用户不存在' })
        }
    } catch (e) {
        res.json({ code: -1, data: null, message: e })
    }
})

/*
 * 修改用户名
 */
router.post('/changeUserName', async (req, res) => {
    try {
        const msg = req.body
        const userId = msg.userId
        const userName = msg.userName
        const data = await db(
            'update basic_info set name="' +
            userName +
            '" where id="' +
            userId +
            '"'
        )
        if (data) {
            res.json({ code: 0, data: null, message: '修改成功' })
        } else {
            res.json({ code: -1, data: null, message: '用户名修改失败，请重新操作' })
        }
    } catch (e) {
        res.json({ code: -1, data: null, message: e })
    }
})

/*
 * 修改性别
 */
router.post('/changeUserSex', async (req, res) => {
    try {
        const msg = req.body
        const userId = msg.userId
        const sex = msg.sex
        const data = db(
            'update basic_info set gender="' + sex + '" where id="' + userId + '"'
        )
        if (data) {
            res.json({ code: 0, data: null, message: '修改成功' })
        } else {
            res.json({ code: -1, data: null, message: error })
        }
    } catch (e) {
        res.json({ code: -1, data: null, message: e })
    }
})

/**
 * 重置密码
 */
router.post('/resetPassword', async (req, res) => {
    try {
        const md5 = crypto.createHash('md5')
        const msg = req.body
        const phone = msg.phone
        const pwd = md5.update(msg.pwd).digest('hex')
        const data = await db(
            'update basic_info set pwd="' +
            pwd +
            '" where phone="' +
            phone +
            '"'
        )
        if (data) res.json({ code: 0, data: null, message: '' })
        else res.json({ code: -1, data: null, message: '密码重置失败，请重新操作' })
    } catch (e) {
        res.json({ code: -1, data: null, message: e })
    }
})

module.exports = router
