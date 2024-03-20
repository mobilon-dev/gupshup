const {GupshupAPIClient} = require('../dist');

const {
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
} = require('./_config');

const client = new GupshupAPIClient({
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
});

async function run () {

  const templateId = '41a82708-f429-46a6-9b18-5cd3f6e80506';

  const q = await client.sendTemplateImageMessage(
    '79135292926',
    templateId,
    ['Сергей', 'День открытых дверей', '26 апреля в 16-00'],
    'https://docs.microsoft.com/ru-ru/windows/apps/design/controls/images/image-licorice.jpg',
  );
  console.log('q', q.data);

}

(run)();
