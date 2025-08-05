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
  const response = await client.getListBlockedUsers();
  console.log(response.data);

  const response2 = await client.blockUser('79101319596');
  console.log(response2.data);

}

(run)();
