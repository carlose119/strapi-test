module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const start = Date.now();
    await next();

    // Check if response type is HTML
    const contentType = ctx.response.get('Content-Type');
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

  };
};
