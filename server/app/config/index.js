if (process.env.NODE_ENV === "test") {
  module.exports = {
    JWT_SECRET: "LshAuthentication",
    oauth: {}
  };
} else {
  module.exports = {
    JWT_SECRET: "LshAuthentication",
    oauth: {
      GitHub: {
      	clientID: "55b07150945744c997bf",
	      clientSecret: "ce1f8576e226e944729fdb695b8a312d7bc6c626"
      }
    }
  };
}
