
import { getUsers } from "../controllers/users.js";
import { sendMessage } from "../bot/utils.js";


export const broadcastAlert = async (data) => {
    const msg = `${data.trade} -- ${data.baseToken}/${data.quoteToken} -- $${data.price} @${(new Date()).toUTCString()}`;
    // console.log('Message to send:', msg);

    try {
        const users = await getUsers({});
        if (users.length === 0)
            return;

        users.forEach(async (user) => {
            await sendMessage(user.chat_id, msg);
        });
    } catch (err) {
        console.error(err);
    }
};
