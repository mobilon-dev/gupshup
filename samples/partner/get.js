const {GupshupPartnerApiClient} = require('../../dist');
const {appToken, appId} = require('../_config');

const start = async () => {
  const client = new GupshupPartnerApiClient({
    appId,
    appToken,
  });

  const data = await client.getDiscount('2024', '01');
  console.log('data', data);
}

(start)()
