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

  const templateId = '17c47daa-416a-4dd1-af38-2ae06681565b';

  /*
  const templateImageMessage = client.createTemplateImageMessage({
    url: 'https://docs.microsoft.com/ru-ru/windows/apps/design/controls/images/image-licorice.jpg',
  });

  const q = await client.sendTemplateMessage(
    '79135292926',
    templateId,
    ['Сергей', 'День открытых дверей', '26 апреля в 16-00'],
    templateImageMessage,
  );
  console.log('q', q.data);

  */


/*

params URLSearchParams {
  'source' => '74996459914',
  'destination' => '79135292926',
  'template' => '{"id":"17c47daa-416a-4dd1-af38-2ae06681565b","params":["Сергей","День открытых дверей","26 апреля в 16-00"]}',
  'message' => '{"type":"image","image":{"link":"https://docs.microsoft.com/ru-ru/windows/apps/design/controls/images/image-licorice.jpg"}}' }
[GupshupApiClient][Request] POST https://api.gupshup.io/wa/api/v1/template/msg {}
[GupshupApiClient][Response] POST https://api.gupshup.io/wa/api/v1/template/msg 202 {"status":"submitted","messageId":"f6cabe4c-9990-4fd6-b565-668a85a696cc"}
q {
  status: 'submitted',
  messageId: 'f6cabe4c-9990-4fd6-b565-668a85a696cc'
}

*/


  const file = fs.createReadStream(path.join(__dirname, '../media/logo.jpg'));
  const response = await client.uploadMedia(file, 'image/jpeg');
  console.log('response', response.data);

  const mediaId = response.data.mediaId;

  const templateImageMessage = client.createTemplateImageMessage({
    mediaId,
  });

  const q = await client.sendTemplateMessage(
    '79135292926',
    templateId,
    ['Сергей', 'День открытых дверей', '26 апреля в 16-00'],
    templateImageMessage,
  );
  console.log('q', q.data);
}

(run)();



/*

[GupshupApiClient][Request] POST https://api.gupshup.io/wa/<<APP>>/wa/media/ {"_overheadLength":258,"_valueLength":10,"_valuesToMeasure":[{"fd":null,"path":"/home/sergey/Projects/@mobilon-dev/gupshup/media/logo.jpg","flags":"r","mode":438,"end":null,"bytesRead":0,"_readableState":{"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":[],"awaitDrainWriters":null},"_events":{},"_eventsCount":3}],"writable":false,"readable":true,"dataSize":0,"maxDataSize":2097152,"pauseStreams":true,"_released":false,"_streams":["----------------------------104756988723479295666170\r\nContent-Disposition: form-data; name=\"file\"; filename=\"logo.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n",{"source":{"fd":null,"path":"/home/sergey/Projects/@mobilon-dev/gupshup/media/logo.jpg","flags":"r","mode":438,"end":null,"bytesRead":0,"_readableState":{"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":[],"awaitDrainWriters":null},"_events":{},"_eventsCount":3},"dataSize":0,"maxDataSize":null,"pauseStream":true,"_maxDataSizeExceeded":false,"_released":false,"_bufferedEvents":[{"0":"pause"}],"_events":{},"_eventsCount":1},null,"----------------------------104756988723479295666170\r\nContent-Disposition: form-data; name=\"file_type\"\r\n\r\n","image/jpeg",null],"_currentStream":null,"_insideLoop":false,"_pendingNext":false,"_boundary":"--------------------------104756988723479295666170"}
[GupshupApiClient][Response] POST https://api.gupshup.io/wa/<<APP>>/wa/media/ 200 {"mediaId":"1939383620240920","status":"success"}
response { mediaId: '1939383620240920', status: 'success' }
params URLSearchParams {
  'source' => '74996459914',
  'destination' => '79135292926',
  'template' => '{"id":"17c47daa-416a-4dd1-af38-2ae06681565b","params":["Сергей","День открытых дверей","26 апреля в 16-00"]}',
  'message' => '{"type":"image","image":{"id":"1939383620240920"}}' }
[GupshupApiClient][Request] POST https://api.gupshup.io/wa/api/v1/template/msg {}
[GupshupApiClient][Response] POST https://api.gupshup.io/wa/api/v1/template/msg 202 {"status":"submitted","messageId":"95f5344b-25c3-429a-907c-51f13a823739"}
q {
  status: 'submitted',
  messageId: '95f5344b-25c3-429a-907c-51f13a823739'
}
*/