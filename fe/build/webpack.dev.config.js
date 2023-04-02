module.exports = config => {
    config.devServer = {
        host: 'localhost',
        proxy: {
            '/health/static': {
                sw: false,
                target: 'http://localhost:8080',
                pathRewrite: { '^/health/static': '/static' },
                changeOrigin: false
            }
        },
        disableHostCheck: true
    }
}