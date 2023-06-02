export default function (req: any, res: any, next: any) {
    /* 请求成功 */
    res.resp = (data: any,  msg: string = 'success',code: number = 200) => {
        let resp = {
            code,
            msg,
            data
        }
        return res.json(resp)
    }
    /* 请求错误 */
    res.resp_err = (code: number, msg: string = 'error', data: any = null) => {
        let resp = {
            code,
            msg,
            data
        }
        return res.json(resp)
    }

    next()
}