const {GupshupPartnerApiClient} = require('../../dist');
const {appToken, appId, debug} = require('../_config');

const client = new GupshupPartnerApiClient({
  appId,
  appToken,
  debug,
});

async function run () {
  const response = await client.getAllApps();

  console.log(response);
}

(run)();
