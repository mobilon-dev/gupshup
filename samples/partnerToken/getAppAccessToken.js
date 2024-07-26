const {GupshupPartnerTokenApiClient} = require('../../dist');

const {
  partnerToken,
  debug,
} = require('./_config');

const client = new GupshupPartnerTokenApiClient({
  partnerToken,
  debug,
});

async function run () {

  const response = await client.getPartnerApps();

  //const response = await client.getAccessTokenForApp('MobilonTelecomWABA0064App');

  console.log(response);
}

(run)();
