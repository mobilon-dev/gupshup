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
  const response1 = await client.getBusinessDetails();
  console.log(response1.data);

  const response2 = await client.getBusinessProfileDetails();
  console.log(response2.data);

  const data = {
    city: 'Moscow',
  };
  const response3 = await client.updateBusinessProfileDetails(data);
  console.log(response3.data);
}

(run)();
