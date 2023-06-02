import jwt from 'jsonwebtoken'
class Token {
    secretKey: string
    time: number | string
    constructor() {
        this.secretKey = 'secretKey'
        this.time = '3d'
    }
    // 生成token
    create(data: object, time: number | string): string {
        let token: string = jwt.sign(data, this.secretKey, {
            algorithm: 'HS256',
            expiresIn: time || this.time,
        })
        return token
    }
    // 验证
    verify(token:string):void{
        return jwt.verify(token,this.secretKey,function(err,decoded){
            if(err)return false
            return true
        })
    }
}

export default new Token