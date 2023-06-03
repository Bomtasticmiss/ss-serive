
import query from '../../middleware/query'
import { encrypt, decrypt } from '../../util/crypto'
import token from '../../util/authorization'

/* 登录 */
async function loginModel(req: any, res: any, cb: (err: any, results?: any) => void) {
    const { username, password } = req.body
    const sql: string = 'select * from ev_users where username=?'
    const { err, results } = await query(sql, username)
    if (err) return cb(err)
    if (results.length === 1) {
        if (decrypt(results[0].password) === password) {
            return res.resp({ username, token: 'Bearer ' + token.create({ username }) }, '登录成功')
        }
        else res.resp_err(200, '密码错误,稍后再试')
    } else {
        return res.resp_err(200, '账户错误,稍后再试')
    }
    // cb(err, results)
}
/* 注册 */
async function registerModel(req: any, res: any, cb: (err: any, results?: any) => void) {
    const { username, password } = req.body
    const sql: string = 'select * from ev_users where username=?'
    const { err, results } = await query(sql, [username])
    if (err) return cb(err)
    console.log(results);
    if (results.length !== 0) return res.resp_err(200, '账号已存在!请重新注册')
    {
        const sql: string = 'insert into ev_users set ?'
        console.log(new Date())
        const user_obj = {
            username,
            password: encrypt(password),
            register_time: new Date(),
            status: 1,
            use_space: 0,
            total_space: 20
        }
        const { err, results } = await query(sql, user_obj)
        console.log(results.length);
        if (err) return cb(err)
        if (results.affectedRows === 1) return res.resp({ username }, '注册成功')
        else return res.resp_err(200, '注册用户失败,稍后再试')
    }

}


export default {
    loginModel,
    registerModel
}