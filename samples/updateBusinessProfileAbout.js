const {GupshupAPIClient} = require('../dist');

const {
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
  debug,
  appId
} = require('./_config');

const client = new GupshupAPIClient({
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
  APP_ID: appId,
  debug,
});

async function run () {
  const response2 = await client.getBusinessProfileAbout();
  console.log(response2.data);

  const about = 'Hey there! I am using WhatsApp.';
  const response3 = await client.updateBusinessProfileAbout(about);
  console.log(response3.data);
}

(run)();
