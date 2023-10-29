const fs = require('fs');
const { Client, GatewayIntentBits, Intents } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ],
});

// config.jsonファイルを読み込む
const config = JSON.parse(fs.readFileSync('config.json'));

client.once('ready', () => {
  console.log(`ログインしました。${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  // BOTには反応しないようにする。twitter.com/x.comが投稿されたことを確認する。
  if (message.author.bot || !(message.content.includes('twitter.com') || message.content.includes('x.com'))) {
    return;
  }

  let updatedContent = message.content;

  // fxtwitter.comまたはvxtwitter.comが含まれる場合はそのメッセージを送信しない
  if (updatedContent.includes('fxtwitter.com') || updatedContent.includes('vxtwitter.com')) {
    return;
  }

  try {
    await message.delete();
  } catch (error) {
    console.error('Error occurred while deleting the message:', error);
  }

  // 特定の文字列の置換と新しいメッセージの送信
  updatedContent = updatedContent.replace(/twitter.com/g, 'fxtwitter.com');
  updatedContent = updatedContent.replace(/x.com/g, 'fxtwitter.com');

  const newMessage = `<@${message.author.id}> (${message.author.id}) : ${updatedContent}`;


  message.channel.send(newMessage);
});

// config.jsonのTOKENを読み込む
client.login(config.discord_token);
