const {GupshupAPIClient} = require('../dist');

async function run () {
  try {
    const client = new GupshupAPIClient({
      API_KEY: '',
      APP_NAME: '',
      SOURCE_MOBILE_NUMBER: '12',
      debug: true,
    });
    
    const response = await client.getTemplatesList();

    console.log(response.data);
  } catch (err) {
    console.log('err', err);
  }
}

(run)();
