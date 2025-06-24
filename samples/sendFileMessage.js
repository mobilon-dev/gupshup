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

  const q = await client.sendMediaFileMessage('79135292926',
    'https://atlas-content-cdn.pixelsquid.com/assets_v2/11/1176360098625229994/jpeg-600/G07.jpg',
    'hello.jpg',
    'Vy new image',
  );
  console.log('q', q.data);
}

(run)();
