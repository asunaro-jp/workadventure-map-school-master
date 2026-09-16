/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags)

    // Show configuration tile for editors only
    if (WA.player.tags.includes('editor')) {
        WA.room.showLayer('exitNorthConfig')
        WA.room.showLayer('exitSouthConfig')
        WA.room.showLayer('exitWestConfig')
        WA.room.showLayer('exitEastConfig')
    }

    // ▼▼▼ ここから追加: 入室したらSlackに通知 ▼▼▼
    fetch('https://hooks.slack.com/services/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', {
        method: 'POST',
        body: JSON.stringify({
            text: `🚪 ${WA.player.name} さんが入室しました`
        })
    }).catch(e => console.error('Slack通知エラー:', e));
    // ▲▲▲ ここまで追加 ▲▲▲

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));