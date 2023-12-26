"use strict";
const utils = require("@strapi/utils");
const { PolicyError, ApplicationError } = utils.errors;

const axios = require('axios');

module.exports = async (policyContext, config, { strapi }) => {
  // Add your own logic here.
  strapi.log.info("recaptcha-policy");

  if(policyContext.request.body["data"] === 'undefined') {
    const details =  {
      policy: "data-undefined",
      code: "REQUIRED",
    };
    throw new PolicyError("data undefined", details);
  }

  // Get request body data
  const requestData = policyContext.request.body["data"];
  const recaptchaResponse = policyContext.request.body["data"]['g-recaptcha-response'];
  if(typeof recaptchaResponse === 'undefined') {
    const details =  {
      policy: "g-recaptcha-response",
      code: "REQUIRED",
    };
    throw new PolicyError("g-recaptcha-response is required", details);
  }

  const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
  const gres = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptchaResponse}`);
  const gdata = gres.data;
  if (!gdata.success) {
    const details =  {
      policy: "g-recaptcha-response",
      code: "Response no valid",
    };
    throw new PolicyError("Recaptcha not valid", details);
  }

  return true;
};
