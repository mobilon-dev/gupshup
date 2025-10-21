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

  /*
  const data = await client.uploadMediaForHandleId(file, 'image/jpeg');
  console.log('data', data);
  */

  const data2 = await client.uploadMediaForHandleId(file, 'image/jpeg', 'logo2.jpg');
  console.log('data2', data2);
}

(start)()


/*

[GupshupPartnerApiClient][Request] POST https://partner.gupshup.io/partner/app/ba3f292a-d52d-4524-bd9a-b4b0f6c46a3f/upload/media {"_overheadLength":259,"_valueLength":10,"_valuesToMeasure":[{"fd":null,"path":"/home/sergey/Projects/@mobilon-dev/gupshup/media/logo.jpg","flags":"r","mode":438,"end":null,"bytesRead":0,"_readableState":{"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":[],"awaitDrainWriters":null},"_events":{},"_eventsCount":3}],"writable":false,"readable":true,"dataSize":0,"maxDataSize":2097152,"pauseStreams":true,"_released":false,"_streams":["----------------------------721721538400511674652502\r\nContent-Disposition: form-data; name=\"file\"; filename=\"logo2.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n",{"source":{"fd":null,"path":"/home/sergey/Projects/@mobilon-dev/gupshup/media/logo.jpg","flags":"r","mode":438,"end":null,"bytesRead":0,"_readableState":{"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":[],"awaitDrainWriters":null},"_events":{},"_eventsCount":3},"dataSize":0,"maxDataSize":null,"pauseStream":true,"_maxDataSizeExceeded":false,"_released":false,"_bufferedEvents":[{"0":"pause"}],"_events":{},"_eventsCount":1},null,"----------------------------721721538400511674652502\r\nContent-Disposition: form-data; name=\"file_type\"\r\n\r\n","image/jpeg",null],"_currentStream":null,"_insideLoop":false,"_pendingNext":false,"_boundary":"--------------------------721721538400511674652502"}
[GupshupPartnerApiClient][Response] POST https://partner.gupshup.io/partner/app/ba3f292a-d52d-4524-bd9a-b4b0f6c46a3f/upload/media 200 {"handleId":{"message":"4::aW1hZ2UvanBlZw==:ARa522xyICm-nIzwaOR-DnqC-3MaZKg_KO3o2KWbwqcWuQrk_Zzrkzrl4vgJCYG6uVM5Uno58jISE2bAiSPYaLREHKAQYKetK53fBTjMQwp_IQ:e:1761382107:2281283925530161:61557712835102:ARaxZAQ9ip_kujYHxqI"},"status":"success"}
data2 {
  handleId: {
    message: '4::aW1hZ2UvanBlZw==:ARa522xyICm-nIzwaOR-DnqC-3MaZKg_KO3o2KWbwqcWuQrk_Zzrkzrl4vgJCYG6uVM5Uno58jISE2bAiSPYaLREHKAQYKetK53fBTjMQwp_IQ:e:1761382107:2281283925530161:61557712835102:ARaxZAQ9ip_kujYHxqI'
  },
  status: 'success'
}

*/