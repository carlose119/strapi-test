'use strict';

/**
 * contacto router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::contacto.contacto', {
  config: {
    create: {
      policies: [
        "api::contacto.recaptcha-policy",
      ],
    },
  },
});
