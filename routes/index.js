

const app = async ctx => {
    ctx.body = '欢迎来到Node版Wallhaven_api\n截屏(json)：http://localhost:3001/screenshots\n获取top壁纸列表:http://localhost:3001/get_top_list';
}

module.exports = app;