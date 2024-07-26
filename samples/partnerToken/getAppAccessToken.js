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

  const dataApps = await client.getPartnerApps();
  console.log('dataApps:', dataApps);


  const appId = '52d361fe-7cbb-4715-a44c-4619060eedae';
  const response = await client.getAccessTokenForApp(appId);

  console.log(response);
}

(run)();
