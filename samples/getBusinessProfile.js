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
  const response = await client.getBusinessDetails();
  console.log(response.data);

  const response2 = await client.getBusinessProfileAbout();
  console.log(response2.data);

  const response3 = await client.getBusinessProfileWABADetails();
  console.log(response3.data);

  const response4 = await client.getBusinessProfilePhoto();
  console.log(response4.data);
}

(run)();
