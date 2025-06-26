const fs = require('fs');
const path = require('path');

const {GupshupPartnerApiClient} = require('../../dist');
const {appToken, appId, debug} = require('../_config');

const start = async () => {
  const client = new GupshupPartnerApiClient({
    appId,
    appToken,
    debug,
  });

  const file = fs.createReadStream(path.join(__dirname, '../../media/logo.jpg'));
  const data = await client.generateMediaIdUsingUpload(file, 'image/jpeg');
  console.log('data', data);
}

(start)()
