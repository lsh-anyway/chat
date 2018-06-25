if (process.env.NODE_ENV === "test") {
    module.exports = {
        JWT_SECRET: "LshAuthentication",
        oauth: {

        }
    };
} else {
    module.exports = {
        JWT_SECRET: "LshAuthentication",
        oauth: {

        }
    };
}
