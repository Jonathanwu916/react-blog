const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
        config,
    );
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@primary-color": "#1890ff",
            "@font-size-base": "14px",
            "@link-color" : "#333",
            "@link-visited-color" : "#333",
            "@link-hover-color" : "#1890ff",
            "@link-active-color" : "#333",
            "@link-decoration" : "none",
            "@link-visited-decoration" : "none",
            "@link-hover-decoration" : "none",
            "@link-focus-decoration" : "none"
        },
        javascriptEnabled: true,
    })(config, env);

    return config;
};