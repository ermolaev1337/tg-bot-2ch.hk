const {fetchJson} = require("../helper");

const getCatalogJson = async () => await fetchJson('https://2ch.hk/b/catalog.json');
const getThreadPostsJson = async threadNum => await fetchJson(`https://2ch.hk/makaba/mobile.fcgi?task=get_thread&board=b&thread=${threadNum}&post=${0}`);

module.exports = {
    getCatalogJson,
    getThreadPostsJson,
}