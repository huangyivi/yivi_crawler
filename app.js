const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const routers = require('./routers');
const router = new Router();
const koaBody = require('koa-body')



// 处理跨域请求
app.use(async (ctx,next) => {
  if (ctx.request.path !== '/' && !ctx.request.path.includes('.')) {
    ctx.response.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': ctx.request.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8',
    })
  }
  ctx.request.method === 'OPTIONS' ? await ctx.response.status(204).end() : await next()
})

// 路由表
for(let route of routers) {
  switch (route.methods) {
    case 'get' : {
      router.get(route.path,require(route.components));
      break;
    }
    case 'post' : {
      router.post(route.path,require(route.components));
      break;
    }
  } 
  
}


// 格式化参数
app.use(koaBody());
app.use(router.routes());
app.listen(3001,() => {
    console.log('server start at http://localhost:3001/')
});
