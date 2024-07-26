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
  console.log('dataApps:', dataApps);

}

(run)();
