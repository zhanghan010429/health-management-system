module.exports = config => {
    config.devServer = {
        host: 'localhost',
        proxy: {
            '/health/static': {
                sw: false,
                target: '',
                pathRewrite: { '^/health/static': '/static' },
                changeOrigin: false
            }
        },
        disableHostCheck: true
    }
}