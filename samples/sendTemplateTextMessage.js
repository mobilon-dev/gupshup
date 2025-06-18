const {GupshupAPIClient} = require('../dist');

const {
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
  appId,
  debug,
} = require('./_config');

const client = new GupshupAPIClient({
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
  APP_ID: appId,
  debug,
});

async function run () {

  // const templateId = '17c47daa-416a-4dd1-af38-2ae06681565b';
  const templateId = '7cc7438b-8398-4eb0-adf4-940227d17efd';

  const q = await client.sendTemplateTextMessage(
    '79135292926',
    templateId,
    ['14-00'],
  );
  console.log('q', q.data);
}

(run)();
