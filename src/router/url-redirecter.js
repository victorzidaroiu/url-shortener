import cache from '../util/cache';

export default async (ctx) => {
  const { hash } = ctx.params;

  const url = await cache.get(hash);

  if (!url) {
    const error = new Error('Invalid url');
    error.status = 404;

    throw error;
  }

  ctx.redirect(url);
};
