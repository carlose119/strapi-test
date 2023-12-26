'use strict';

/**
 * `fullurl` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In fullurl middleware.');

    // Check if response type is HTML
    const contentType = ctx.response.get('url');
    //strapi.log.info(JSON.stringify(ctx.body));
    if (contentType && contentType.includes('text/html')) {
      const host = ctx.request.origin;
      const body = ctx.body;

      // Check if body is a string
      if (typeof body === 'string') {
        // Replace all relative URLs in the HTML with full URLs
        const regex = /(?<=href="|src=")(?!https?:\/\/)(?!data:)(?!mailto:)([^"]+)/g;
        ctx.body = body.replace(regex, `${host}/$1`);
      }
    }

    await next();
  };
};
