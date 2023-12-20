module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',

  {
    resolve: "./src/middlewares/resolveUrls",
    config: {
      enabled: true,
      conf: {},
    },
  },
  /* {
    path: '/api/posts',
    resolve: './src/middlewares/resolveUrlMedia',
  }, */
  {
    resolve: "./src/api/post/middlewares/fullurl",
    config: {
      enabled: true,
      conf: {},
    },
  },

  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  /* {
    name: 'resolveUrls',
    config: {
      "enabled": true
    },
  }, */
];
