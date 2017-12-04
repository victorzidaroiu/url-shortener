import Koa from 'koa';
import koaBody from 'koa-body';
import router from './router';
import errorHandler from './middleware/error-handler';

const app = new Koa();

app
  .use(errorHandler)
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
