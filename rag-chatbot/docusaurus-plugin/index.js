// docusaurus-plugin-rag-chatbot/src/index.js
const path = require('path');

module.exports = function (context, options) {
  const { siteConfig } = context;
  const { baseUrl } = siteConfig;

  return {
    name: 'docusaurus-plugin-rag-chatbot',
    
    getThemePath() {
      return path.resolve(__dirname, './theme');
    },
    
    getClientModules() {
      return [path.resolve(__dirname, './theme/ChatbotComponent.js')];
    },
    
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            '@site/static/rag-chatbot': path.resolve(__dirname, '../static'),
          },
        },
      };
    },
  };
};