/**
 * 接口用途：爬取某网站的壁纸
 * 方法类型：get
 * 参数：{
 *  type : 壁纸类型
 *  page : 第几页 
 * }
*/


const puppeteer = require("puppeteer");
const app = async (ctx) => {
    const query = ctx.query;
    if(query.type) {
        let getPicsPromise = new Promise(async (resolve, reject) => {
            try {
              const browser = await puppeteer.launch();
              const page = await browser.newPage();
              await page.goto(`https://wallhaven.cc/${query.type}?page=${query.page}`);
              let previews = await page.$$eval(".lazyload", (els) =>
                els.map((ele) => ele.getAttribute("data-src"))
              );
              let wallpapers = previews.map((item) => item.replace("small", "full"));
              wallpapers = wallpapers.map((item) => item.replace("th", "w"));
        
              let ids = Array.of(wallpapers)[0];
              ids = ids.map((item) => item.split("/"));
              for (let item of ids) {
                item[5] = "wallhaven-" + item[5];
              }
              wallpapers = ids.map((item) => item.join("/"));
              let wallpapers_png = wallpapers.map(item=>item.replace('jpg','png'))
              let data = {
                previews: previews,
                wallpapers_jpg: wallpapers,
                wallpapers_png: wallpapers_png,
              };
              resolve(JSON.stringify(data));
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
          let data = await getPicsPromise;
          console.log(data);
          ctx.body = data;
    }else {
        ctx.body = '请先传值'
    }
  
};

module.exports = app;
