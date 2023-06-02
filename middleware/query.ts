import db from '../db'
/**
 *@param sql 查找语句
 *@param filed 字段
 *
 **/
export default function Query(sql: string, field?: any) {
    return new Promise((resolve:(value:{err:any,results:any})=>void, reject) => {
        db.query(sql, field,async (err, results) => {
            if (err) {
                console.log(err)
            }
            resolve({err,results})
        })
    })
}