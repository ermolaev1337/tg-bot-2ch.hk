const fetch = require('node-fetch');

const fetchJson = async url => await fetch(url).then(res => res.json());

module.exports = {
    fetchJson
}
