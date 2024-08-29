
import axios from "axios";
import assert from 'assert';
import { config } from 'dotenv';

import * as instance from './index.js';
import * as sessions from './sessions.js';
import { sendMessage } from './utils.js';
import { createUser } from "../controllers/users.js";


config();


const COMMAND_START = 'start';


// Options
const OPTION = {
    MAIN: 0
};


// Messages
const getWelcomeMessage = (username) => {
	return `Hi ${username}!
Welcome to @${process.env.BOT_NAME}!
Here you can receive Perpetual trade signals continuously.
Currently supports 3 major cryptocurrencies; BTC, ETH and SOL`;
};


// Procedures
export const procMessage = async (message) => {
    const chatid = message?.chat?.id.toString();
    let session = sessions.get(chatid);
    const username = message?.chat?.username;

    if (!message.text) return;

    let command = message.text;
    if (message.entities) {
        for (const entity of message.entities) {
            if (entity.type === 'bot_command') {
                command = command.substring(entity.offset, entity.offset + entity.length);
                break;
            }
        }
    }

    if (command.startsWith('/')) {
        // console.log('message.text:', message.text);
        
        if (!session) {
            if (!username) {
                console.error(`Rejected anonymous incoming connection. chatid = ${chatid}`);
                return;
            }

            // create a new ssion
            try {
                await createUser({
                    chat_id: chatid, 
                    username: username
                });
                session = sessions.create(chatid, message.from);
            } catch (err) {
                console.error('failed to create session:', err.message);
                return;
            }
        }

        command = command.slice(1);
        if (command === COMMAND_START) {
            await sendMessage(chatid, getWelcomeMessage(session.username));
        }
    } else {
        // The others are described here...
    }
};

export const executeCommand = async (chatid, messageId, callbackQueryId, option) => {
    const cmd = option.c;
    const id = option.k;
    const session = sessions.get(chatid);
    // console.log('cmd:', cmd, '  id:', id);

    try {
        switch (cmd) {
        case OPTION.MAIN:
            {
                const sessionId = id;
                assert(sessionId);

                await sendMessage(chatid, getWelcomeMessage(session.username));

                await instance.bot.answerCallbackQuery(callbackQueryId);
            }
            break;

        default:
            break;
        }
    } catch (err) {
        console.error('executeCommand:', err.message);
        await instance.bot.sendMessage(chatid, '😢 Sorry, there were some errors on the command. Please try again later 😉');
		await instance.bot.answerCallbackQuery(callbackQueryId, { text: '😢 Sorry, there were some errors on the command. Please try again later 😉' });
    }
};
