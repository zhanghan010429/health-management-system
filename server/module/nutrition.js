/**
 * 营养数据相关
 * @author: zhanghan
 * @since:  2023/3/10
 */

const express = require('express')
const router = express.Router()
const db = require('../helper/db')


/**
 * 获取营养数据
 */
router.post('/getNutrition', async (req, res) => {
    const msg = req.body
    const { id } = msg;

    try {
        const result = await db(
            `select cereals_and_tubers, animal_food, legumes_and_nuts, vegetables_and_fruits, pure_energy_food from type_of_food_intake where id="${id}"`
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
 * 添加或者修改卡路里数据
 */
router.post('/setNutrition', async (req, res) => {
    const msg = req.body
    const { id, cereals_and_tubers, animal_food, legumes_and_nuts, vegetables_and_fruits, pure_energy_food } = msg;

    try {
        const result = await db(
            'select id from type_of_food_intake where id="' + id + '"'
        )
        if (result.length >= 1) {
            const update = await db(
                `update type_of_food_intake set cereals_and_tubers="${cereals_and_tubers}", animal_food="${animal_food}", legumes_and_nuts="${legumes_and_nuts}", vegetables_and_fruits="${vegetables_and_fruits}", pure_energy_food="${pure_energy_food}" where id=${id}`
            )
            if (update) {
                res.json({ code: 1, data: null, message: '修改成功' })
            }
        } else {
            const inserted = db(
                `insert into type_of_food_intake set id=${id}, cereals_and_tubers="${cereals_and_tubers}", animal_food="${animal_food}", legumes_and_nuts="${legumes_and_nuts}", vegetables_and_fruits="${vegetables_and_fruits}", pure_energy_food="${pure_energy_food}"`
            )
            if (inserted) res.json({ code: 0, data: null, message: '添加成功' })
            else res.json({ code: -1, data: null, message: '添加失败' })
        }
    } catch (err) {
        res.json({ code: -1, data: null, message: '失败' })
    }
})

module.exports = router
