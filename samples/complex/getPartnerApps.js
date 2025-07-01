const {
  GupshupPartnerServiceClient, 
  GupshupPartnerTokenApiClient,
} = require('../../dist');

const {
  debug,
  email,
  password,
} = require('./_config');




async function run () {

  const gsServiceClient = new GupshupPartnerServiceClient({
    debug,
  });

  const response = await gsServiceClient.getPartnerToken(email, password);
  console.log(response);

  const partnerToken = response.token;

  const gsPartnerTokenClient = new GupshupPartnerTokenApiClient({
    partnerToken,
    debug,
  });
  
  const dataApps = await gsPartnerTokenClient.getPartnerApps();
  console.log('apps:', dataApps.partnerAppsList.length);
  const liveApps = dataApps.partnerAppsList.filter(a => a.live === true)
  console.log('live apps:', liveApps.length);
  console.log('live', liveApps.splice(0,2))

}

(run)();
