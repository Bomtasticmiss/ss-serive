import mysql from 'mysql'
import fs from 'fs'

interface Config {
    [propName: string]: any;
}
interface Db {
    query(req: string, field: any, cb: (req: any, res: any) => void): void
}

// let db_config:Config=JSON.parse(fs.readFileSync('../config/default.json').toString())
let db_config: Config = require('../config/default.json')

console.log(db_config)

const config: Config = {
    ...db_config
}

const db: Db = mysql.createPool(config)


export default db

