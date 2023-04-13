import { deCrypto } from '../utils/crpto'
import { isNotEmptyString } from '../utils/is'

const decrypt = async (req, res, next) => {
  const { key } = req.body
  let AUTH_SECRET_KEY: string
  if (isNotEmptyString(key)) {
    try {
      AUTH_SECRET_KEY = deCrypto(key)
    }
    catch (error) {
      res.send({ status: '', message: error.message ?? 'Openai key error', data: null })
    }
  }
  else {
    res.send({ status: '', message: 'Openai key is null', data: null })
  }
  req.body.key = AUTH_SECRET_KEY
  next()
}

export { decrypt }
