const {GupshupPartnerServiceClient} = require('../../dist');

const {
  debug,
  email,
  password,
} = require('./_config');


const client = new GupshupPartnerServiceClient({
  debug,
});

async function run () {

  const response = await client.getPartnerToken(email, password);
  console.log(response);
}

(run)();
