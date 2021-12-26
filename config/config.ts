import dotenv from 'dotenv'
dotenv.config()

const TARGET = process.env.TARGET as string

export const config = {
  NODE_ENV:  process.env.NODE_ENV as string,
  TARGET:  process.env.TARGET as string,
  TARGET_MOBILE_NUMBER:  process.env[TARGET as string] as string,
  USER_DATA_DIR:  process.env.USER_DATA_DIR as string,
}
