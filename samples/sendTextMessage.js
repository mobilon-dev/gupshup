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

  const q = await client.sendTextMessage('79135292926', 'test text sample');
  console.log('q', q.data);
}

(run)();
