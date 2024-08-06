const mineflayer = require('mineflayer');
const bot = mineflayer.createBot({
  host: 'asianf4rmer.minecraft.pe', // Server IP
  username: 'Korblox', // Your username
});
bot.on('spawn', () => {
  bot.chat('/login 602001882'); // Log in
  bot.chat('/survival'); // Switch to survival mode
});

// Function to start autofishing
function startAutofishing() {
  // Listen for fishing rod usage
  bot.on('entitySwingArm', (entity) => {
    if (entity === bot.entity) {
      // If the bot swings its arm (uses a fishing rod), cast the line
      bot.activateItem();
    }
  });
}




setInterval(() => {
  bot.chat('/sellall inventory'); // Sell all items
  bot.chat('/bal'); // Check balance
}, 30000);


const axios = require('axios');
const webhookUrl = 'https://discord.com/api/webhooks/1270382432041959444/Hkuu9LfQMtUZorhh5h42abfAc-xlcuZMIgx9lu8YC4yKS6JMQIkQE8GnUMtyiR7QfEOO';

// Inside your command execution logic:
bot.on('chat', (username, message) => {
  // Send message to webhook
  axios.post(webhookUrl, { content: `${username}: ${message}` });
});



// Inside your command execution logic:
bot.on('chat', (username, message) => {
  if (message.startsWith('/bal')) {
    // Execute the /bal command and capture the response
    const balanceResponse = bot.chat(message);

    // Send the balance response to the webhook
    axios.post(webhookUrl, { content: `${username}: ${balanceResponse}` });
  }
});



const targetCoords = { x: xTarget, y: yTarget, z: zTarget };
const maxDistance = 10; // Maximum allowed distance from target

bot.on('move', () => {
  const distance = bot.entity.position.distanceTo(targetCoords);
  if (distance > maxDistance) {
    console.log('Bot moved too far. Kicking...');
    bot.end(); // Disconnect the bot

    // Send a message to the Discord webhook
    const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL'; // Replace with your webhook URL
    axios.post(webhookUrl, { content: 'Bot moved too far!' });
  }
