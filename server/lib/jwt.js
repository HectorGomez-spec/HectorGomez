
import jwt from 'jsonwebtoken'
import {SECRET_KEY} from '../config.js'

export function createAccessToken(payload,expire) {
    return new Promise((resolve, reject) => {
        jwt.sign({ payload },
            SECRET_KEY,
            { expiresIn: expire },
            (err, token) => {
                if (err) reject(err);
                resolve(token)
            });
    })
}