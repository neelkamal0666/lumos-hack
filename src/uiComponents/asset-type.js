export const getAssetType = (url) => {
    // console.log(url);
    if (/assets\/\w+\/\w+\/image/.test(url)) return 'image';
    else if (/assets\/\w+\/\w+\/video/.test(url)) return 'video';
    else return 'threeD';
};