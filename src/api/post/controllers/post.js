'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

//module.exports = createCoreController('api::post.post');

module.exports = createCoreController('api::post.post', ({ strapi }) =>  ({

  /* async find(ctx) {
    // validateQuery (optional)
    // to throw an error on query params that are invalid or the user does not have access to
    await this.validateQuery(ctx);

    // sanitizeQuery to remove any query params that are invalid or the user does not have access to
    // It is strongly recommended to use sanitizeQuery even if validateQuery is used
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    let { results, pagination } = await strapi.service('api::post.post').find(sanitizedQueryParams);


    const fullUrl = strapi.config.get('server.url') + ':' + strapi.config.get('server.port') + '/uploads';
    for (var clave in results){
      if (results[clave].File) {
        results[clave].File.url = results[clave].File.url.replace('/uploads', fullUrl);
        if (results[clave].File.formats.thumbnail) {
          results[clave].File.formats.thumbnail.url = results[clave].File.formats.thumbnail.url.replace('/uploads', fullUrl);
        }
        if (results[clave].File.formats.small) {
          results[clave].File.formats.small.url = results[clave].File.formats.small.url.replace('/uploads', fullUrl);
        }
        if (results[clave].File.formats.medium) {
          results[clave].File.formats.medium.url = results[clave].File.formats.medium.url.replace('/uploads', fullUrl);
        }
        if (results[clave].File.formats.large) {
          results[clave].File.formats.large.url = results[clave].File.formats.large.url.replace('/uploads', fullUrl);
        }
        //strapi.log.info(JSON.stringify(results[clave]));
      }
    }


    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });
  } */

  /* async find(ctx) {
    // validateQuery (optional)
    // to throw an error on query params that are invalid or the user does not have access to
    await this.validateQuery(ctx);

    // sanitizeQuery to remove any query params that are invalid or the user does not have access to
    // It is strongly recommended to use sanitizeQuery even if validateQuery is used
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    let { results, pagination } = await strapi.service('api::post.post').find(sanitizedQueryParams);

    const getService = name => {
      return strapi.plugin('upload').service(name);
    };
    // Parser function
    const prefixUrl = data => {
      const fullUrl = strapi.config.get('server.url') + ':' + strapi.config.get('server.port') + '/uploads';
      // let formats = data.formats.thumbnail ? {
      //   thumbnail: data.formats.thumbnail.url.replace('/uploads', fullUrl),
      // } : data.formats;
      // formats = data.formats.large ? {
      //   large: data.formats.large.url.replace('/uploads', fullUrl),
      // } : data.formats;
      // formats = data.formats.medium ? {
      //   medium: data.formats.medium.url.replace('/uploads', fullUrl),
      // } : data.formats;
      // formats = data.formats.small ? {
      //   small: data.formats.small.url.replace('/uploads', fullUrl),
      // } : data.formats;

      let formats = data.formats;
      if (formats.thumbnail) {
        formats.thumbnail.url = data.formats.thumbnail.url.replace('/uploads', fullUrl);
      }
      if (formats.large) {
        formats.large.url = data.formats.large.url.replace('/uploads', fullUrl);
      }
      if (formats.medium) {
        formats.medium.url = data.formats.medium.url.replace('/uploads', fullUrl);
      }
      if (formats.small) {
        formats.small.url = data.formats.small.url.replace('/uploads', fullUrl);
      }

      return {
        ...data, url: data.url.replace('/uploads', fullUrl), formats
      }
    }

    //const files = await getService('upload').findMany(ctx.query).then(items => items.map(each => prefixUrl(each)));
    //strapi.log.info(JSON.stringify(files));

    results.map((obj,i) => {
      let fila = Object.keys(obj);
      //strapi.log.info(`${fila} - ${i}`);
      for (let x = 0; x < fila.length; x++) {
        if (results[i][fila[x]].url) {
          //strapi.log.info(`${results[i][fila[x]].url} | ${fila[x]} - ${i}`);
          results[i][fila[x]] = prefixUrl(results[i][fila[x]]);
        }
      }
    });

    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });
  } */

  /**
     * Retrieve records.
     */
  /* async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: 'en' }

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.prefixUrlMedia = strapi.config.get('server.url') + ':' + strapi.config.get('server.port') + '/uploads';

    return { data, meta };
  }, */

  /**
   * Retrieve records.
   */
  async find(ctx) {
    // validateQuery (optional)
    // to throw an error on query params that are invalid or the user does not have access to
    await this.validateQuery(ctx);

    // sanitizeQuery to remove any query params that are invalid or the user does not have access to
    // It is strongly recommended to use sanitizeQuery even if validateQuery is used
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    let { results, pagination } = await strapi.service('api::post.post').find(sanitizedQueryParams);

    // Parser function
    const prefixUrl = data => {
      const fullUrl = strapi.config.get('server.url') + ':' + strapi.config.get('server.port') + '/uploads';

      let formats = data.formats;
      if (formats.thumbnail) {
        formats.thumbnail.url = data.formats.thumbnail.url.replace('/uploads', fullUrl);
      }
      if (formats.large) {
        formats.large.url = data.formats.large.url.replace('/uploads', fullUrl);
      }
      if (formats.medium) {
        formats.medium.url = data.formats.medium.url.replace('/uploads', fullUrl);
      }
      if (formats.small) {
        formats.small.url = data.formats.small.url.replace('/uploads', fullUrl);
      }

      return {
        ...data, url: data.url.replace('/uploads', fullUrl), formats
      }
    }

    results.map((obj,i) => {
      let fila = Object.keys(obj);
      for (let x = 0; x < fila.length; x++) {
        if (results[i][fila[x]].url) {
          results[i][fila[x]] = prefixUrl(results[i][fila[x]]);
        }
      }
    });

    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });
  },

  /**
   * Retrieve a record.
   *
   * @return Object
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    await this.validateQuery(ctx);
    const sanitizedQuery = await this.sanitizeQuery(ctx);
    let entity = await strapi.service('api::post.post').findOne(id, sanitizedQuery);

    // Parser function
    const prefixUrl = data => {
      const fullUrl = strapi.config.get('server.url') + ':' + strapi.config.get('server.port') + '/uploads';

      let formats = data.formats;
      if (formats.thumbnail) {
        formats.thumbnail.url = data.formats.thumbnail.url.replace('/uploads', fullUrl);
      }
      if (formats.large) {
        formats.large.url = data.formats.large.url.replace('/uploads', fullUrl);
      }
      if (formats.medium) {
        formats.medium.url = data.formats.medium.url.replace('/uploads', fullUrl);
      }
      if (formats.small) {
        formats.small.url = data.formats.small.url.replace('/uploads', fullUrl);
      }

      return {
        ...data, url: data.url.replace('/uploads', fullUrl), formats
      }
    }

    let fila = Object.keys(entity);
    for (let x = 0; x < fila.length; x++) {
      if (entity[fila[x]].url) {
        entity[fila[x]] = prefixUrl(entity[fila[x]]);
      }
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

}));
