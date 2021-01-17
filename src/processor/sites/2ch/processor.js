const R = require('ramda');

const validateThreadsByKeywords = R.filter(R.compose(
    R.anyPass(R.map(R.test, [/засмеялся/, /обосрался/, /webm/, /dark/, /mp4/,])),
    R.toLower,
    R.prop('subject'),
));

const getValidThreads = R.compose(
    R.map(R.prop('num')),
    validateThreadsByKeywords,
    R.prop('threads')
);

const filterByExtension = R.filter(R.compose(
    R.anyPass(R.map(R.test, [/.mp4$/,])),
    R.prop('fullname'),
));

const validateFilesByExtensions = R.compose(
    R.flatten,
    R.map(R.compose(
        filterByExtension,
        R.prop('files'),
    ))
);

const getPaths = R.map(R.compose(
    R.concat('https://2ch.hk'),
    R.prop('path'),
));

const concatUniq = R.compose(
    R.uniq,
    R.flatten,
    R.concat,
);

module.exports = {
    validateFilesByExtensions,
    getValidThreads,
    getPaths,
    concatUniq,
};

