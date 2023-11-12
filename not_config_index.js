const { Client, GatewayIntentBits, Intents } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ],
});

client.once('ready', () => {
  console.log(`ログインしました。${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) {
    return;
  }

  const content = message.content;

  // fxtwitter.com / fixupx.com / vxtwitter.com / fixv.comが含まれる場合はそのメッセージを送信しない
  if (content.includes('fxtwitter.com') || content.includes('fixupx.com') || content.includes('vxtwitter.com') || content.includes('fixvx.com')) {
    return;
  }

  // メッセージが "https://twitter.com/username/status/xxxxxx" または "https://x.com/username/status/xxxxxx" の形式を確認する。
  if (content.match(/https:\/\/(twitter\.com|x\.com)\/[^/]+\/status\/\d+/)) {
    try {
      await message.delete();

      // twitter.comの場合は、fxtwitter.comに変更し、x.comの時は、fixupx.comに変更する。
      const updatedContent = content
        .replace(/https:\/\/twitter\.com/g, 'https://fxtwitter.com')
        .replace(/https:\/\/x\.com/g, 'https://fixupx.com');
      
      const newMessage = `<@${message.author.id}> (${message.author.id}) : ${updatedContent}`;
      message.channel.send(newMessage);
    } catch (error) {
      console.error('メッセージの処理中にエラーが発生しました:', error);
    }
  }
});

// "TOKEN"の中のTOKENを読み込む
client.login("TOKEN");
