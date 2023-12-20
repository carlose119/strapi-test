// middlewares/my-route-middleware.js
const resolveUrlMedia = (req, res, next) => {
  if (req.path === '/api/users') {
    // Código del middleware
  }
  next();
};

module.exports = resolveUrlMedia;
