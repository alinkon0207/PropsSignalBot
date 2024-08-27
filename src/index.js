
import { Telegraf, Markup } from "telegraf"
import { config } from "dotenv"
import axios from "axios"

import connectDB/* , { createUser } */ from "./db/index.js"


config()

const { TELEGRAM_BOT_API } = process.env

const bot = new Telegraf(TELEGRAM_BOT_API)

let credentials = {
    chat_id: undefined, 
    first_name: undefined, 
    last_name: undefined, 
    username: undefined
}

bot.use(Telegraf.log())


bot.command("start", ctx => {
    console.log('ctx.chat:', ctx.chat)
    credentials.username = ctx.chat.username
    
    ctx.replyWithHTML(
        `Hello <b>${ctx.chat.username}</b>
Welcome to <b>@${process.env.BOT_NAME}</b>
You can receive UCTS signals on 1/2 days periodically`,
        {
            parse_mode : "HTML"
        }
    )
})


connectDB()

bot.launch()
