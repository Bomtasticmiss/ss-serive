import express from 'express'
import bodyParser from 'body-parser'
import userRouter from './routers/user'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import resp from './middleware/resp'
import token from './util/authorization'

const app = express()
const PORT: number = 3001

// 解析 application/json
app.use(bodyParser.json({ limit: '100mb' }))
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

// app.use(cookieParser())

// app.use(session({
//     secret: 'lernning', //随意填写
//     resave: false, //固定写法
//     saveUninitialized: false,//true表示，第一次访问页面不需要登录就生成sessionId，
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 1, //1小时
//         httpOnly: true
//     },
//     name:'RR_UID',
//     rolling: true  //用户最后一次请求开始计算，重新刷新session的有效期，类似淘宝中午不吃饭一直刷，1小时不过期，如果出去午休了，回来再刷新，需要重新登录，淘宝就是不想让你吃午饭，多点为马云做贡献
// }))

// 配置跨域请求中间件(服务端允许跨域请求)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin); // 设置允许来自哪里的跨域请求访问（值为*代表允许任何跨域请求，但是没有安全保证）
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // 设置允许接收的请求类型
    res.header("Access-Control-Allow-Headers", "Content-Type,request-origin"); // 设置请求头中允许携带的参数
    res.header("Access-Control-Allow-Credentials", "true"); // 允许客户端携带证书式访问。保持跨域请求中的Cookie。注意：此处设true时，Access-Control-Allow-Origin的值不能为 '*'
    res.header("Access-control-max-age", '900'); // 设置请求通过预检后多少时间内不再检验，减少预请求发送次数
    if (req.method.toLowerCase() == 'options') res.send(200); //让options尝试请求快速结束
    else next();
})

/* 挂载响应 */
app.use(resp)
/*注册路由*/
app.use('/v1/user', userRouter)


app.listen(PORT, () => {
    console.log('api_server服务已启动http://127.0.0.1:3001')
})