const fs = require('fs');
const path = require('path');

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
  
  const file = fs.createReadStream(path.join(__dirname, '../media/logo.jpg'));
  const response2 = await client.uploadMedia(file, 'image/jpeg');
  console.log(response2.data);

}

(run)();


/*

[GupshupApiClient][Request] POST https://api.gupshup.io/wa/9b9572f8-7377-4000-b0ea-ef0cc2f0e5a3/wa/media/ {"_overheadLength":258,"_valueLength":10,"_valuesToMeasure":[{"fd":null,"path":"/home/sergey/Projects/@mobilon-dev/gupshup/media/logo.jpg","flags":"r","mode":438,"end":null,"bytesRead":0,"_readableState":{"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":[],"awaitDrainWriters":null},"_events":{},"_eventsCount":3}],"writable":false,"readable":true,"dataSize":0,"maxDataSize":2097152,"pauseStreams":true,"_released":false,"_streams":["----------------------------326604191986399238095236\r\nContent-Disposition: form-data; name=\"file\"; filename=\"logo.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n",{"source":{"fd":null,"path":"/home/sergey/Projects/@mobilon-dev/gupshup/media/logo.jpg","flags":"r","mode":438,"end":null,"bytesRead":0,"_readableState":{"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":[],"awaitDrainWriters":null},"_events":{},"_eventsCount":3},"dataSize":0,"maxDataSize":null,"pauseStream":true,"_maxDataSizeExceeded":false,"_released":false,"_bufferedEvents":[{"0":"pause"}],"_events":{},"_eventsCount":1},null,"----------------------------326604191986399238095236\r\nContent-Disposition: form-data; name=\"file_type\"\r\n\r\n","image/jpeg",null],"_currentStream":null,"_insideLoop":false,"_pendingNext":false,"_boundary":"--------------------------326604191986399238095236"}
[GupshupApiClient][Response] POST https://api.gupshup.io/wa/9b9572f8-7377-4000-b0ea-ef0cc2f0e5a3/wa/media/ 200 {"mediaId":"1106146887611013","status":"success"}
{ mediaId: '1106146887611013', status: 'success' }

*/


