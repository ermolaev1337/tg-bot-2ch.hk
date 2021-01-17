const {Telegraf, session} = require('telegraf');

const getContentElement = (index, contentStorage) => {
    if (contentStorage.length === 0) {
        index--;
        return 'Loading videos from 2ch.hk, try later';
    }

    if (index >= contentStorage.length) {
        index--;
        return `All ${contentStorage.length} videos watched, try later :)`;
    }

    if (contentStorage.length > 0) {
        return contentStorage[index];
    }
};

const sessionStorage = {};

function* generateLink(sessionId, contentStorage) {
    while (true) {
        sessionId in sessionStorage ? sessionStorage[sessionId] += 1 : sessionStorage[sessionId] = 0;
        yield getContentElement(sessionStorage[sessionId], contentStorage)
    }
}

const getSessionKey = ctx => {
    if (ctx.from && ctx.chat) {
        return `${ctx.from.id}:${ctx.chat.id}`
    } else if (ctx.from && ctx.inlineQuery) {
        return `${ctx.from.id}:${ctx.from.id}`
    }
    return null
};

const initBot = async (token) => {
    const bot = new Telegraf(token);
    bot.use(session());
    return bot;
};

const configBot = bot => {
    bot.hears('hi', (ctx) => ctx.reply('Hello! Send me a sticker'));
    bot.hears('session', (ctx) => ctx.reply(JSON.stringify(sessionStorage, null, '\t')));
    bot.start((ctx) => ctx.reply('Hi there! Send me a sticker'));
    bot.help((ctx) => ctx.reply('Send me a sticker to have fun'));
};

module.exports = {
    generateLink,
    getSessionKey,
    initBot,
    configBot,
};