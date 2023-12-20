module.exports = {

  async afterCreate(event) {

    const { result, params } = event;
    /* const data = {
      contentType: 'Contatos',
      action: 'New Content Entry',
      content: result.Content,
      author: result.createdBy,
      params: params,
      result: result,
      request: event,
    }; */
    strapi.log.info(JSON.stringify(result));

    await strapi.plugin('email').service('email').send({
      to: result.email,
      from: 'someone2@example.com',
      subject: 'Contacto Evanhub',
      text: `Hola ${result.Nombre}, tu mensaje es: ${result.Mensaje}`,
      html: `<h1>Hola ${result.Nombre}</h1><p>${result.Mensaje}</p>`,
    });

  },
}
