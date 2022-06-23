const path = require("path");
const CracoLessPlugin = require("craco-less");
const pathConfig = require("./paths.json");

const customPathAlias = Object.keys(pathConfig.compilerOptions.paths)
  .map((aliasKey) => {
    const pathName = pathConfig.compilerOptions.paths[aliasKey][0].split("*");
    const pathKey = aliasKey.split("/*");
    return {
      [pathKey[0]]: path.resolve(
        __dirname,
        `${pathConfig.compilerOptions.baseUrl}/${pathName[0]}`
      ),
    };
  })
  .reduce((previousValue, currentValue) => {
    return { ...previousValue, ...currentValue };
  }, {});

module.exports = {
  webpack: {
    alias: customPathAlias,
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
