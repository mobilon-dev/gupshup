# @mobilon-dev/gupshup

Gupshup API client

[Gupshup.io](https://gupshup.io)

[Gupshup group in Telegram](https://t.me/ru_gupshup)

[Gupshup Whatsapp API docs](https://www.gupshup.io/developer/docs/bot-platform/guide/whatsapp-api-documentation)


`````javascript
const {GupshupAPIClient} = require('@mobilon-dev/gupshup');

const client = new GupshupAPIClient({
  API_KEY: 'XXXXX',
  APP_NAME: 'XXXXX',
  SOURCE_MOBILE_NUMBER: 'XXXXXX',
});

async function run () {
  // const response = await client.getTemplatesList();
  
  // const response = await client.getWalletBalance();

  // const response = await client.sendTextMessage('79135292926', 'привет');

  const response = await client.sendMediaImageMessage(
    '79135292926', 
    'https://docs.microsoft.com/ru-ru/windows/apps/design/controls/images/image-licorice.jpg',
    'картинка',
  );

  console.log(response.data);
}

(run)();
`````
