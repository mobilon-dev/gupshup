const {GupshupPartnerApiClient} = require('../../dist');
const {appToken, appId, debug, API_KEY} = require('../_config');

const start = async () => {
  const client = new GupshupPartnerApiClient({
    appId,
    appToken,
    debug,
    API_KEY,
  });

  const data1 = await client.getBusinessProfileDetails();
  const data2 = await client.getBusinessProfileAbout();
  const data3 = await client.getBusinessProfilePhoto();
  console.log('data', data1);
  console.log('data', data2);
  console.log('data', data3);
}

(start)()
