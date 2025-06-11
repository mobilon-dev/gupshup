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
  const response = await client.markUserOptIn('79135292927');
  console.log(response.data);
  
  const response2 = await client.getOptInUsersList();
  console.log(response2.data.users.filter(item => item.phoneCode === '9135292927'));
}

(run)();
