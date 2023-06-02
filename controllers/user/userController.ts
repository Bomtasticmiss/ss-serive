import query from '../../middleware/query'
import userModel from '../../models/user/userModel'

/* 登录 */
function loginController(req: any, res: any) {
    const { username, password } = req.body
    console.log('--req.body--',req.body)
    console.log('--req.headers.cookie--',req.headers.cookie,req.session.user)
    if (req.session.user) {
        return res.resp({ username }, '用户已登陆')
    }
    // console.log('--req.headers.cookie--',req.headers.cookie,req.session.user)
    if (!username || !password) {
        return res.resp_err(200, '账号或或密码不能为空！')
    }
    userModel.loginModel(req, res, (err, results) => {
        if (err) return res.resp_err(500, err.sqlMessage)

    })
}

/* 注册 */
function registerController(req: any, res: any) {
    const { username, password } = req.body
    if (!username || !password) {
        return res.resp_err(200, '账号或或密码不能为空！')
    }
    userModel.registerModel(req, res, (err, results) => {
        if (err) return res.resp_err(500, err.sqlMessage)
        // if(results.lengths>0){
        //     return res.resp_err(200, '账号已存在!请重新注册')
        // }
    })
}

export default {
    loginController,
    registerController
}
