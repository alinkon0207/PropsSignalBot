
import { Telegraf, Markup } from "telegraf"
import { config } from "dotenv"

import connectDB from "./db/index.js"
import { createUser } from "./controllers/users.js"


config()

const { TELEGRAM_BOT_API } = process.env

const bot = new Telegraf(TELEGRAM_BOT_API)

// bot.use(Telegraf.log())


bot.command("start", async ctx => {
    let credentials = {
        chat_id: undefined, 
        username: undefined
    }
        
    credentials.chat_id = ctx.chat.id
    credentials.username = ctx.chat.username
    await createUser(credentials)
    
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
