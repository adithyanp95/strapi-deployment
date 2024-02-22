("use strict");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],
      afterCreate: async (event) => {
        const { result } = event;
        const { username, email, id } = result; // Extracting username and email from result

        console.log(
          `New user created: Username - ${username}, Email - ${email}`
        );
        await strapi.service("api::person.person").create({
          data: { username, email, id },
        });
        await strapi.service("api::link.link").create({
          data: { username, email, person: [id] },
        });

        await strapi.service("api::image.image").create({
          data: { username, id },
        });
      },
    });
  },
};
