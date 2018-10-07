export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core"],
    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "Bearer",
    accessTokenProp: "data",

    storageChangedReload: true
};