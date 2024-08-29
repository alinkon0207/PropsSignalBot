
const sessions = new Map();


export const create = (chat_id, from) => {
    let session = {
        chat_id: chat_id, 
		username: from.username
    };

    sessions.set(chat_id, session);

    return session;
};

export const set = (chat_id, session) => {
    sessions.set(chat_id, session);
};

export const get = (chat_id) => {
    return sessions.get(chat_id);
};
