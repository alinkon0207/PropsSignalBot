
import * as instance from './index.js';


// Options
export const json_buttonItem = (key, cmd, text) => {
	return {
		text: text,
		callback_data: JSON.stringify({ k: key, c: cmd }),
	};
};

export const json_inlineButtonItem = (web, text) => {
	return {
		text: text,
		web_app: web
	};
};


// Utilities

export async function openMenu(chatId, menuTitle, jsonButtons) {
	const keyboard = {
		inline_keyboard: jsonButtons,
		resize_keyboard: true,
		one_time_keyboard: true,
		force_reply: true
	};

	try {
		await instance.bot.sendMessage(chatId, menuTitle, { 
            reply_markup: keyboard, 
            parse_mode: 'HTML', 
            disable_web_page_preview: true 
        });
	} catch (err) {
		console.error('openMenu', err.message);
	}
};

export async function sendMessage(chatid, message, enableLinkPreview = true) {
	try {
		let data = { parse_mode: 'HTML' };

		if (enableLinkPreview)
			data.disable_web_page_preview = false;
		else
			data.disable_web_page_preview = true;
		data.disable_forward = true;

		await instance.bot.sendMessage(chatid, message, data);
	} catch (err) {
		console.error('sendMessage', err.message);
		return false;
	}

    return true;
};

export async function sendReplyMessage(chatid, message) {
	try {
		let data = { 
            parse_mode: 'HTML', 
            disable_forward: true, 
            disable_web_page_preview: true, 
            reply_markup: { force_reply: true } 
        };

		await instance.bot.sendMessage(chatid, message, data);
	} catch (err) {
		console.error('sendReplyMessage', err.message);
		return false;
	}

    return true;
};

export async function sendOptionMessage(chatid, message, option) {
	try {
		const keyboard = {
			inline_keyboard: option,
			resize_keyboard: true,
			one_time_keyboard: true,
			force_reply: true
		};

		await instance.bot.sendMessage(chatid, message, { 
            reply_markup: keyboard, 
            disable_web_page_preview: true, 
            parse_mode: 'HTML' 
        });
	} catch (err) {
		console.error('sendOptionMessage', err.message);
	}
};

export const removeMessage = async (sessionId, messageId) => {
	try {
		await instance.bot.deleteMessage(sessionId, messageId);
	} catch (err) {
		console.error('removeMessage', err.message);
	}
};

export const switchMenuWithTitle = async (chatId, messageId, title, json_buttons) => {
	const keyboard = {
		inline_keyboard: json_buttons,
		resize_keyboard: true,
		one_time_keyboard: true,
		force_reply: true
	};

	try {
		await instance.bot.editMessageText(title, { 
            chat_id: chatId, 
            message_id: messageId, 
            reply_markup: keyboard, 
            disable_web_page_preview: true, 
            parse_mode: 'HTML' 
        });
	} catch (err) {
		console.error('[switchMenuWithTitle]', err.message);
	}
};
