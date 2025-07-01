const {GupshupPartnerApiClient} = require('../../dist');
const {appToken, appId, debug} = require('../_config');

const client = new GupshupPartnerApiClient({
  appId,
  appToken,
  debug,
});

async function run () {

  const q = await client.addSubscription({
    url: 'https://gwaba-gupshup-api.services.mobilon.ru/message/GWABA0001-555',
    tag: 'to2-3',
    version: '2',
    // modes: 'NONE',
    modes: 'SENT,DELIVERED,ENQUEUED,READ,DELETED,OTHERS,MESSAGE,TEMPLATE,ACCOUNT,BILLING',  // version=2
    // modes: 'SENT,DELIVERED,ENQUEUED,READ,DELETED,OTHERS,MESSAGE,TEMPLATE,ACCOUNT,BILLING,FLOWS_MESSAGE,PAYMENTS',  // version=3
    doCheck: 'false'
  });
  console.log('q', q.data);

  const subscriptionId = q.data?.subscription?.id;
  console.log('subscription id', subscriptionId);
  const response = await client.getAllSubscriptions();

  console.log(response.data);
}

(run)();
