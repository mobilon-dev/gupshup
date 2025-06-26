const fs = require('fs');
const path = require('path');

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

  const response4 = await client.getBusinessProfilePhoto();
  console.log(response4.data);


  const file = fs.createReadStream(path.join(__dirname, '../media/logo.jpg'));
  const response2 = await client.updateBusinessProfilePhoto(file);
  console.log(response2.data);

}

(run)();




