import validator from 'validator';
import hash from '../util/hash';
import cache from '../util/cache';

const maxHashLength = 10;
const serverUrl = 'http://localhost:3000';
const urlRedirectEndpoint = `${serverUrl}/redirect`;

export default async (ctx) => {
  const { url } = ctx.request.body;

  if (!url) {
    const error = new Error('No url');
    error.status = 400;

    throw error;
  }

  if (!validator.isURL(url)) {
    const error = new Error('Invalid url');
    error.status = 400;

    throw error;
  }

  const urlHash = hash(url).substring(0, maxHashLength);

  const shortUrl = await cache.get(urlHash);

  if (!shortUrl) {
    cache.set(urlHash, url);
  }

  ctx.body = {
    url: `${urlRedirectEndpoint}/${urlHash}`,
  };
};
