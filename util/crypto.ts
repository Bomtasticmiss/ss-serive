import crypto from 'crypto'

const key = '123456789123456789123456'
const iv = '1234567891234567'
const algorithm = 'aes192'
const encoding = 'hex'
/* 加密 */
export function encrypt(ctx: string): string {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    cipher.update(ctx)
    return cipher.final(encoding)
}
/* 解密 */
export function decrypt(encryptedStr: string): string {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    decipher.update(encryptedStr, encoding)
    return decipher.final('utf8')
}
