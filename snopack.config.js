module.exports = {
    plugins: [
        // ['@snowpack/plugin-sass' ],
    ],
    mount: {
        src: "/",
    },
    buildOptions: {
        out: "build",
        baseUrl: "/recipe/build/",
        clean: true,
    },
    experiments: {
        optimize: {
            // 'bundle': true,
            minify: true,
            target: "es2015",
        },
    },
};