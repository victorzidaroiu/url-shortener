import { expect } from 'chai';
import sinon from 'sinon';
import urlShortener from '../../../src/router/url-shortener';
import * as hash from '../../../src/util/hash';
import cache from '../../../src/util/cache';

describe('urlShortener route', () => {
  let ctx = {};
  let hashResponse;
  let validatorResponse;
  let cacheGetResponse;
  let url;
  let error;

  beforeEach(async () => {
    ctx = {
      request: {
        body: {
          url,
        },
      },
    };

    sinon.stub(hash, 'default').callsFake(() => hashResponse);
    sinon.stub(cache, 'get').callsFake(() => cacheGetResponse);
    sinon.stub(cache, 'set').callsFake(() => {});

    try {
      await urlShortener(ctx);
    } catch (e) {
      error = e;
    }
  });

  afterEach(() => {
    ctx = null;
    hash.default.restore();
    cache.get.restore();
    cache.set.restore();
    error = null;
  });

  context('when given a valid url', () => {
    before(() => {
      hashResponse = 'ABCD';
      cacheGetResponse = Promise.resolve('redis response');
      url = 'http://example.com';
    });

    it('returns the url hash', () => {
      const expectedUrl = `http://localhost:3000/redirect/${hashResponse}`;
      expect(ctx.body.url).to.equal(expectedUrl);
    });
  });

  context('when given an invalid url', () => {
    before(() => {
      hashResponse = 'ABCD';
      cacheGetResponse = Promise.resolve('redis response');
      url = 'invalid url';
    });

    it('throws an error', () => {
      const expectedError = new Error('Invalid url');
      expect(error).to.be.a.instanceOf(Error);
      expect(error.message).to.deep.equal(expectedError.message);
    });
  });
});
