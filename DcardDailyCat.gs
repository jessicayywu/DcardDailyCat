function postDcard() {
  
  var url = 'https://www.dcard.tw/service/api/v2/forums/[FORUM_NAME]/posts';
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      'title': '[TITLE]',
      'content': '[CONTENT]',
      'anonymous':true, // 是否隱藏科系
      'topics':['[TOPIC1]', '[TOPIC2]'], // 話題標籤
      'withNickname':false}), // 是否使用卡稱
    'headers': {
       'x-csrf-token': '[YOUR_x-csrf-token]',
       'authorization': '[YOUR_x-csrf-token]',
       'cookie':  'dcard-web.sig=[YOUR_authorization];'
                + 'dcard=[YOUR_dcard];'
                + 'dcard.sig=[YOUR_dcard.sig];'
                + 'dcsrd=[YOUR_dcsrd];'
                + 'dcsrd.sig=[YOUR_dcsrd.sig];'
    }  
  };
  var res = UrlFetchApp.fetch(url, options);
//  Logger.log(res.getContentText());
}

function getRandomCat() {
  var url = 'https://api.thecatapi.com/v1/images/search?limit=1?size=%22full%22';
  var res = UrlFetchApp.fetch(url);
//  Logger.log(JSON.parse(res.getContentText())[0].url);
  
  return uploadToImgur(JSON.parse(res.getContentText())[0].url);
}

function uploadToImgur(catURL) {
  var url = 'https://api.imgur.com/3/image.json';
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      'image': catURL,
      'type': 'URL',
      'title': '[IMG_TITLE]',
      'description': '[IMG_DESCRIPTION]'}),
    'headers': {
       'Authorization': 'Client-ID [YOUR_CLIENT_ID]',
    }  
  };
  var res = UrlFetchApp.fetch(url, options);
//  Logger.log(JSON.parse(res.getContentText()).data.link);
  return JSON.parse(res.getContentText()).data.link;
}
