require('dotenv').config();

const nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {
  const { username, katakana, useremail, message } = JSON.parse(event.body).payload.data;

  // OAuth認証情報
  const auth = {
    type         : 'OAuth2',
    user         : process.env.OAUTH_USER,
    clientId     : process.env.OAUTH_CLIENT_ID,
    clientSecret : process.env.OAUTH_CLIENT_SECRET,
    refreshToken : process.env.OAUTH_REFRESH_TOKEN
  };


  // トランスポート
  const transport = {
    service : 'gmail',
    auth    : auth
  };

  let transporter = nodemailer.createTransport(transport);

  const url = 'https://notes-sharesl.netlify.app/';

  let mailOptions = {
    from    : `notes by SHARESL <ysk.inoue@sharesl.net>`,
    to      : `${useremail}`,
    subject : '【notes by SHARESL】お問い合わせありがとうございます',
    text    : `${username} 様\n\nお問い合わせありがとうございます。\n以下の内容でフォームを送信いたしました。\n数日中に追って担当者よりメールにて回答をお送りいたします。\n今しばらくお待ちください。\n\n------ 送信内容 ------\n【お名前】\n${username}\n【フリガナ】\n${katakana}\n【メールアドレス】\n${useremail}\n【お問い合わせ内容】\n${message}\n--------------------\nnotes by SHARESL\n${url}\n`,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      callback(error);
    } else {
      callback(null, {
        statusCode: 200,
        body: 'ok',
      });
    }
  });
};