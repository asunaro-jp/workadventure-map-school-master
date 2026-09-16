// entry_zone にアバターが入ったとき
WA.room.onEnterZone('entry_zone', () => {
    // プレイヤー名（取得できない場合は「ゲスト」）
    const playerName = WA.player.name || "ゲスト";
    
    // Slack Incoming Webhook URL
    const slackWebhookUrl = "https://hooks.slack.com/services/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";

    // 送信するメッセージ
    const payload = {
        text: `📢 【入室通知】 ${playerName} さんがエリアに入室しました！`
    };

    // Slackへ送信
    fetch(slackWebhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).catch(error => {
        console.error("Slack送信エラー:", error);
    });
});