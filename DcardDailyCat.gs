function postDcard() {
  var today = new Date();
  var todayText = today.getFullYear() + '/' +
                  (today.getMonth() + 1) + '/' +
                  today.getDate();
  
  var url = 'https://www.dcard.tw/service/api/v2/forums/whysoserious/posts';
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      'title': '每日一貓 (' + todayText + ')',
      'content': '今天的隨機貓貓\n\n'+ getRandomCat() + '\n喵~ฅ(=●ω●=)ฅ',
      'anonymous':true,
      'topics':['每日一貓'],
      'withNickname':false}),
    'headers': {
       'x-csrf-token': '[Your x-csrf-token]',
       'authorization': '[Your x-csrf-token]',
       'cookie':  'dcard-web.sig=[YOUR authorization];'
                + 'dcard=[YOUR dcard];'
                + 'dcard.sig=[YOUR dcard.sig];'
                + 'dcsrd=[YOUR dcsrd];'
                + 'dcsrd.sig=[YOUR dcsrd.sig];'
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
      'title': 'Daily Random Cat',
      'description': 'Meow'}),
    'headers': {
       'Authorization': 'Client-ID f0ea04148a54268',
//       'origin': 'https://www.dcard.tw',
    }  
  };
  var res = UrlFetchApp.fetch(url, options);
//  Logger.log(JSON.parse(res.getContentText()).data.link);
  return JSON.parse(res.getContentText()).data.link;
}
