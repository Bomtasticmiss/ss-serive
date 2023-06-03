import jwt from 'jsonwebtoken'
/* JWT类 */
class Token {
    private secretKey: string
    time: number | string
    constructor() {
        this.secretKey = 'secretKey'
        this.time = '1d'
    }
    // 生成token
    create(data: object, time?: number | string): string {
        let token: string = jwt.sign(data, this.secretKey, {
            algorithm: 'HS256',
            expiresIn: time || this.time,
        })
        return token
    }
    // 验证
    verify(token: string) {
        const reg = /^['|"](.*)['|"]$/;
        // 其中，^[' | "]表示匹配字符串开始位置中的单引号或双引号，
        //[' | "]$表示匹配字符串结束位置中的单引号或双引号，
        //(.*)是一个子表达式，且表示匹配除开始、结束位置的所有字符
        token = token.replace(reg, "$1").split(' ')[1]
        console.log(token, '-----token-----')
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, function (err, decoded) {
                // console.log('err', err)
                // console.log('decoded', decoded)
                if (err) return reject(err)
                return resolve(decoded)
            })
        })

    }
}

export default new Token