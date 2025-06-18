const {GupshupAPIClient} = require('../dist');

const {
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
  debug,
  appId
} = require('./_config');

const client = new GupshupAPIClient({
  API_KEY,
  APP_NAME,
  SOURCE_MOBILE_NUMBER,
  APP_ID: appId,
  debug,
});

async function run () {
  const response = await client.getTemplatesList();
  console.log(response.data);

  const templateId = '7418bd9a-1381-437e-939b-9f47898c53dd';
  const response2 = await client.getTemplateById(templateId);
  console.log(response2.data);


}

(run)();
