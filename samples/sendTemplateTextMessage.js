const {GupshupAPIClient} = require('../dist');

const {
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
  debug,
} = require('./_config');

const client = new GupshupAPIClient({
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
  debug,
});

async function run () {

  const templateId = '17c47daa-416a-4dd1-af38-2ae06681565b';

  const q = await client.sendTemplateTextMessage(
    '79135292926',
    templateId,
    ['Сергей', 'День открытых дверей'],
  );
  console.log('q', q.data);
}

(run)();
