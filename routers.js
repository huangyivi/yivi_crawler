module.exports = [
    {
        methods: 'get',
        path: '/',
        components : './routes/index.js'
    },
    {
        methods: 'post',
        path: '/screenshot',
        components: './routes/screenshot.js'
    },
    {
        methods: 'get',
        path: '/get_wallpapers',
        components: './routes/getWallpapers.js'
    }
]

