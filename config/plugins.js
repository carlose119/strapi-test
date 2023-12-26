module.exports = ({ env }) => ({
  // ...
  seo: {
    enabled: true,
  },
  // ...
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env('SMTP_PORT', 465),
        secure: true,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'hello@example.com'),
        defaultReplyTo: env('SMTP_REPLYTO', 'hello@example.com'),
      },
    },
  },
  // ...
});
