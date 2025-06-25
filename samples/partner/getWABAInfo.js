const {GupshupPartnerApiClient} = require('../../dist');
const {appToken, appId, debug, API_KEY} = require('../_config');

const start = async () => {
  const client = new GupshupPartnerApiClient({
    appId,
    appToken,
    debug,
    API_KEY,
  });

  const data = await client.getWABAInfo();
  console.log('data', data);

  const data2 = await client.checkHealth();
  console.log('data', data2);
}

(start)()


/*

[GupshupPartnerApiClient][Request] GET https://partner.gupshup.io/partner/app/ba3f292a-d52d-4524-bd9a-b4b0f6c46a3f/waba/info
[GupshupPartnerApiClient][Response] GET https://partner.gupshup.io/partner/app/ba3f292a-d52d-4524-bd9a-b4b0f6c46a3f/waba/info 200 {"status":"success","wabaInfo":{"accountStatus":"ACTIVE","allowedTps":70,"canSendMessage":"AVAILABLE","dockerStatus":"CONNECTED","messagingLimit":"TIER_1K","mmLiteStatus":"ELIGIBLE","ownershipType":"CLIENT_OWNED","phone":"78002008111","phoneQuality":"GREEN","throughput":"STANDARD","timezone":"(GMT+05:30) (Asia/Kolkata)","utilityRestriction":false,"verifiedName":"Мобилон Телекоммуникации","wabaId":"154375870159132","wabaName":"Мобилон Телекоммуникации"}}
data {
  status: 'success',
  wabaInfo: {
    accountStatus: 'ACTIVE',
    allowedTps: 70,
    canSendMessage: 'AVAILABLE',
    dockerStatus: 'CONNECTED',
    messagingLimit: 'TIER_1K',
    mmLiteStatus: 'ELIGIBLE',
    ownershipType: 'CLIENT_OWNED',
    phone: '78002008111',
    phoneQuality: 'GREEN',
    throughput: 'STANDARD',
    timezone: '(GMT+05:30) (Asia/Kolkata)',
    utilityRestriction: false,
    verifiedName: 'Мобилон Телекоммуникации',
    wabaId: '154375870159132',
    wabaName: 'Мобилон Телекоммуникации'
  }
}

[GupshupPartnerApiClient][Request] GET https://partner.gupshup.io/partner/app/ba3f292a-d52d-4524-bd9a-b4b0f6c46a3f/health
[GupshupPartnerApiClient][Response] GET https://partner.gupshup.io/partner/app/ba3f292a-d52d-4524-bd9a-b4b0f6c46a3f/health 200 {"status":"success","healthy":"true"}
data { status: 'success', healthy: 'true' }


*/
