const {GupshupPartnerApiClient} = require('../../dist');
const {appToken, appId, debug} = require('../_config');

const start = async () => {
  const client = new GupshupPartnerApiClient({
    appId,
    appToken,
    debug,
  });

  const data = await client.getDiscount('2024', '01');
  console.log('data', data);
}

(start)()
