const {GupshupAPIClient} = require('../dist');
const {stringify} = require('qs');
const {
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
  appId,
  debug,
} = require('./_config');

const client = new GupshupAPIClient({
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
  APP_ID: appId,
  debug,
});


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function run () {

  const q = await client.addSubscription({
    url: 'https://gwaba-gupshup-api.services.mobilon.ru/message/WABAAPPID',
    tag: 'custom_name_webhook',
    version: '2',
    // modes: 'NONE',  
    // 'DELIVERED', 'READ', 'SENT', 'DELETED', 'OTHERS', 'TEMPLATE', 'ACCOUNT'
    modes: 'SENT,DELIVERED,ENQUEUED,READ,DELETED,OTHERS,MESSAGE,TEMPLATE,ACCOUNT,BILLING',  // version=2
    // modes: 'SENT,DELIVERED,ENQUEUED,READ,DELETED,OTHERS,MESSAGE,TEMPLATE,ACCOUNT,BILLING,FLOWMESSAGE,PAYMENTS',  // version=3
    doCheck: 'false'
  });
  console.log('q', q.data);
  const subscriptionId = q.data?.subscription?.id;
  console.log('subscription id', subscriptionId);
  await delay(30000);

  const q2 = await client.deleteSubscription(subscriptionId);
  console.log('q2', q2.data);

}

(run)();
