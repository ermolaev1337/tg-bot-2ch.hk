require('dotenv').config();
const {getCatalogJson, getThreadPostsJson} = require("./api/sites/2ch/api");
const {getValidThreads, getPaths, validateFilesByExtensions, concatUniq} = require("./processor/sites/2ch/processor");

const R = require('ramda');
const {configBot} = require("./bot/tg");
const {getSessionKey} = require("./bot/tg");
const {generateLink} = require("./bot/tg");
const {initBot} = require("./bot/tg");

const getMp4From2ch = async contentStorage => {

    const mapValidFiles = R.map(R.compose(
        R.andThen(getPaths),
        R.andThen(validateFilesByExtensions),
        getThreadPostsJson,
    ));

    const catalog = await getCatalogJson();
    const validThreadsNums = await getValidThreads(catalog);
    const validFilesByThreads = await Promise.all(mapValidFiles(validThreadsNums));
    contentStorage = concatUniq(contentStorage, validFilesByThreads);
    return contentStorage;
};

const main = async () => {
    let contentStorage = [];
    setInterval(async () => {
        contentStorage = await getMp4From2ch(contentStorage);
        console.log(`Files: ${contentStorage.length}`)
    }, 10000);

    const bot = await initBot(process.env.TELEGRAM_TOKEN);
    configBot(bot);
    bot.on('sticker', async (ctx) => {
        await ctx.reply(generateLink(getSessionKey(ctx), contentStorage).next().value.toString());
    });
    await bot.launch();


    setInterval(async () => {
    }, 1000);
};

main();

module.exports = {
    getMp4From2ch,
};
