/**
 * 数据库配置
 * @author: zhanghan
 * @since:  2023/3/20
 */

const mysql = require('mysql')

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'health_mange'
})
db.connect()

module.exports = sql => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
