import RedisNodeCache from 'redis-node-cache';

const cache = new RedisNodeCache({
  redisUrl: 'redis://localhost:6379',
  prefix: 'url-shortener-',
});

export default cache;
