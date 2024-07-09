const {GupshupPartnerApiClient} = require('../../dist');
const {appToken, appId, debug} = require('../_config');

const start = async () => {
  const client = new GupshupPartnerApiClient({
    appId,
    appToken,
    debug,
  });

  const data = await client.getUsage('2024-07-04','2024-07-04');
  console.log('data', data);
}

(start)()
