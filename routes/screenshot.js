/**
 * 接口用途：获取某个网站的快照
 * 方法类型：post
 * 参数：{
 *  url : 网站的网址（带上http或http）,
 *  name : 保存的文件名称
 * }
 * 
 */ 

const puppeteer = require("puppeteer");
const app = async (ctx) => {
  let params = ctx.request.body;
  console.log("screenshots:");
  console.log(params);
  if (params.url) {
    let getScreenshotPromise = new Promise(async (resolve,reject) => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // await page.setViewport()
        await page.goto(params.url);
        let pic = params.name
          ? `./assets/${params.name}.png`
          : `./assets/${Date.parse(new Date())}.png`;
        let buffer = await page.screenshot({ path: pic,fullPage: true });
        await browser.close();
        resolve(buffer);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
    let data = await getScreenshotPromise;
    await ctx.response.attachment("picture.png");
    ctx.body = data;

  }else {
    ctx.body = '请传入目标网址'
  }
};

module.exports = app;
