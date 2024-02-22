// src/middlewares/peopleMiddleware.js

module.exports = async (ctx, next) => {
  if (ctx.request.method === "GET" && ctx.request.url === "/people") {
    // Your middleware logic here
    console.log("Middleware triggered for GET /people endpoint");
  }

  // Call the next middleware in the stack
  await next();
};
