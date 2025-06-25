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

  const q = await client.sendMediaAudioMessage('79135292926',
    'https://download.samplelib.com/mp3/sample-6s.mp3'
  );
  console.log('q', q.data);

  /*
  const q = await client.sendMediaAudioMessage('79135292926',
    'https://download.samplelib.com/mp3/sample-6s.mp3',
    'My favorite song',    // caption не работает
  );
  console.log('q', q.data);
  */
}

(run)();
