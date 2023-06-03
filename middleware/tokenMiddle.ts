import Token from '../util/authorization'

// 验证token中间件
const verify = function (req: any, res: any, next: any): void {
    let token: string = req.headers.authorization || req.body.token || req.query.token || ''
    Token.verify(token).then((value) => {
        req.user = value
        next()
    }).catch((value) => {
        res.resp_err(200, 'token无效')
    })
}

export default {
    verify
}
