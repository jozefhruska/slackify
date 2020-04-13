module.exports = {
  client: {
    service: {
      name: "service-private",
      url: "http://localhost:5000/",
    },

    includes: ["packages/frontend/src/api/**/*.ts"],
  },
};
