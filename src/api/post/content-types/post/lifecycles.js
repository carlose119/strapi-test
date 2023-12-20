module.exports = {

  async afterCreate(event) {

    const { result, params } = event;
    const data = {
      contentType: 'Post',
      action: 'New Content Entry',
      content: result.Content,
      author: result.createdBy,
      params: params,
      result: result,
      request: event,
    };
    strapi.log.info(JSON.stringify(data));

    await strapi.plugin('email').service('email').send({
      to: 'carlos.carrillo@somosforma.com',
      from: 'someone2@example.com',
      subject: 'Hello world',
      text: 'Hello world',
      html: `<h4>Hello world</h4>`,
    });

  },
}
