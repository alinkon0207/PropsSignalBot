
import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';

import { getUsers } from '../controllers/users.js';
import * as ui from './ui.js';
import * as sessions from './sessions.js';


config();

const token = process.env.BOT_TOKEN;

export const bot = new TelegramBot(token/* , { polling : true } */);


export async function init() {
    const users = await getUsers();

    for (const user of users) {
        const session = {
            chat_id: user.chat_id, 
			username: user.username
        };

        sessions.set(session.chat_id || "", session);
    }
};


bot.on('message', async (msg) => {
    // console.log('========== message ==========');
	// console.log(msg);
	// console.log('=============================');

    await ui.procMessage(msg);
});

bot.on('callback_query', async (callbackQuery) => {
    // console.log('========== callback query ==========');
	// console.log(callbackQuery);
	// console.log('====================================');

	const message = callbackQuery.message;
	if (!message) {
		return;
	}

	const option = JSON.parse(callbackQuery.data);
	let chatid = message.chat.id.toString();

	await ui.executeCommand(chatid, message.message_id, callbackQuery.id, option);
});
