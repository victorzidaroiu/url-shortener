import Router from 'koa-router';
import urlShortener from './url-shortener';
import urlRedirecter from './url-redirecter';

const router = new Router();

router.post('/api/v1/short', urlShortener);
router.get('/redirect/:hash', urlRedirecter);

export default router;
