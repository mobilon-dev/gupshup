const {GupshupPartnerApiClient} = require('../../dist');
const {appToken, appId, debug} = require('../_config');

const start = async () => {
  const client = new GupshupPartnerApiClient({
    appId,
    appToken,
    debug,
  });

  const data = await client.getMessageLimit();
  console.log('data', data);
}

(start)()
