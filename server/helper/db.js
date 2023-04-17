/**
 * 数据库配置
 * @author: zhanghan
 * @since:  2023/3/20
 */

const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'health_manage2'
})
db.connect()

module.exports = sql => {
    console.log(sql,'sql')
    return new Promise((resolve, reject) => {
        db.query(sql, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
