const fs = require('fs');
const path = require('path');

const {GupshupAPIClient} = require('../dist');

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

async function run () {

    /*
  const textMessage = client.createTextMessage('test text sample');
  console.log('textMessage', textMessage);
  const q = await client.sendSessionMessage('79135292926', textMessage);
  console.log('q', q.data);
  */

/*

textMessage { type: 'text', text: 'test text sample' }
params URLSearchParams {
  'channel' => 'whatsapp',
  'source' => '74996459914',
  'destination' => '79135292926',
  'message' => '{"type":"text","text":"test text sample"}',
  'src.name' => 'MobilonTelecomWABA0094AppNew' }
[GupshupApiClient][Request] POST https://api.gupshup.io/wa/api/v1/msg {}
[GupshupApiClient][Response] POST https://api.gupshup.io/wa/api/v1/msg 202 {"status":"submitted","messageId":"737ec318-799e-483c-81f4-f7aa6f2e332d"}
q {
  status: 'submitted',
  messageId: '737ec318-799e-483c-81f4-f7aa6f2e332d'
}

*/

const file = fs.createReadStream(path.join(__dirname, '../media/logo.jpg'));
const response = await client.uploadMedia(file, 'image/jpeg');
console.log('response', response.data);


const message = client.createImageMessage({
    caption: 'test image',
    mediaId: response.data.mediaId,
});
console.log('message', message);
const q = await client.sendSessionMessage('79135292926', message);
console.log('q', q.data);

/*
[GupshupApiClient][Request] POST https://api.gupshup.io/wa/<<XXX AAPP>>/wa/media/ {"_overheadLength":258,"_valueLength":10,"_valuesToMeasure":[{"fd":null,"path":"/home/sergey/Projects/@mobilon-dev/gupshup/media/logo.jpg","flags":"r","mode":438,"end":null,"bytesRead":0,"_readableState":{"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":[],"awaitDrainWriters":null},"_events":{},"_eventsCount":3}],"writable":false,"readable":true,"dataSize":0,"maxDataSize":2097152,"pauseStreams":true,"_released":false,"_streams":["----------------------------397521955199638997363510\r\nContent-Disposition: form-data; name=\"file\"; filename=\"logo.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n",{"source":{"fd":null,"path":"/home/sergey/Projects/@mobilon-dev/gupshup/media/logo.jpg","flags":"r","mode":438,"end":null,"bytesRead":0,"_readableState":{"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":[],"awaitDrainWriters":null},"_events":{},"_eventsCount":3},"dataSize":0,"maxDataSize":null,"pauseStream":true,"_maxDataSizeExceeded":false,"_released":false,"_bufferedEvents":[{"0":"pause"}],"_events":{},"_eventsCount":1},null,"----------------------------397521955199638997363510\r\nContent-Disposition: form-data; name=\"file_type\"\r\n\r\n","image/jpeg",null],"_currentStream":null,"_insideLoop":false,"_pendingNext":false,"_boundary":"--------------------------397521955199638997363510"}
[GupshupApiClient][Response] POST https://api.gupshup.io/wa/<<XXX AAPP>>/wa/media/ 200 {"mediaId":"1321503279346749","status":"success"}
response { mediaId: '1321503279346749', status: 'success' }
message {
  type: 'image',
  originalUrl: undefined,
  previewUrl: undefined,
  caption: 'test image',
  id: '1321503279346749'
}
params URLSearchParams {
  'channel' => 'whatsapp',
  'source' => '74996XXXXXX',
  'destination' => '79135292926',
  'message' => '{"type":"image","caption":"test image","id":"1321503279346749"}',
  'src.name' => 'MobilonTelecomWABA0094AppNew' }
[GupshupApiClient][Request] POST https://api.gupshup.io/wa/api/v1/msg {}
[GupshupApiClient][Response] POST https://api.gupshup.io/wa/api/v1/msg 202 {"status":"submitted","messageId":"67412c55-9219-49f7-a03e-77a5b39f2ba6"}
q {
  status: 'submitted',
  messageId: '67412c55-9219-49f7-a03e-77a5b39f2ba6'
}

*/

}

(run)();
