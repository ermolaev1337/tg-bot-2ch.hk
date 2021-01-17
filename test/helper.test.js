//
// it('getValidThreadNums', function () {
//     console.info(getValidThreads(catalog.threads))
// });
//
// it('mapFiles', function () {
//     const validFiles = getValidFiles(posts)
//     // console.log(validFiles)
//     console.log(getPaths(validFiles))
// });


const {getMp4From2ch} = require("../src");
it('main', async function () {
    let contentStorage = [];
    contentStorage = await getMp4From2ch(contentStorage);
    console.log(contentStorage);
});
//
//
// it('should return true if valid user id', function () {
//     expect(isValidKeyword([{'gdsdd.mp4':12342, "abs.webm"]))
// });