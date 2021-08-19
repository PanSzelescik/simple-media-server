const mix = require('laravel-mix');

mix.setPublicPath('build')
    .copy('public/', 'build')
    .js('resources/js/service-worker.js', 'build/service-worker.js')
    .webpackConfig({
        resolve: {
            alias: {
                "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
                "react/jsx-runtime": "react/jsx-runtime.js"
            }
        }
    })
    .react()
    .js('resources/js/app.js', 'build/app.js')
    .sass('resources/css/app.scss', 'build/app.css')
    .disableNotifications()
    .sourceMaps(false)
