import {GupshupAPIClient} from '../index';

const client = new GupshupAPIClient({
  API_KEY: 'test',
  APP_NAME: 'test',
  SOURCE_MOBILE_NUMBER: 'test',
});

describe('checks', () => {
  it('contentType', (done) => {
    expect(client.checkContentType('audio', 'audio/mpeg')).toBe(true);
    expect(client.checkContentType('video', 'video/mp4')).toBe(true);
    expect(client.checkContentType('image', 'image/jpeg')).toBe(true);

    done();
  });

  it('size', (done) => {
    expect(client.checkSize('audio', 100 * 1024)).toBe(true);
    expect(client.checkSize('video', 100 * 1024)).toBe(true);
    expect(client.checkSize('image', 100 * 1024)).toBe(true);

    expect(client.checkSize('audio', 17 * 1024 * 1024)).toBe(false);
    expect(client.checkSize('video', -1)).toBe(false);

    done();
  });
});
