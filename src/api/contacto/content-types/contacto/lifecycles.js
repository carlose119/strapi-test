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
    //strapi.log.info(JSON.stringify(result));

    const email = await strapi.plugin('email').service('email').send({
      to: result.email,
      from: 'someone2@example.com',
      subject: 'Contacto Evanhub',
      text: `Hola ${result.Nombre}, tu mensaje es: ${result.Mensaje}`,
      html: `<h1>Hola ${result.Nombre}</h1><p>${result.Mensaje}</p>`,
    });
    strapi.log.info(JSON.stringify(email));

    if (email.response && email.response.indexOf('250 2.0.0 OK') != -1) {
      //enviado con exito
      result.email_enviado = true;
      const entry = await strapi.entityService.update('api::contacto.contacto', result.id, {
        data: {
          email_enviado: true,
        },
      });
      strapi.log.info(JSON.stringify(entry));
    }

  },
}
