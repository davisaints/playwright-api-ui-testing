const getEnvVariable = (variable: string) => String(process.env[variable]);

const sitesConfig = {
  url: {
    baseUrl: "https://restful-booker.herokuapp.com",
  },
  auth: {
    username: "admin",
    password: getEnvVariable("ADMIN_PASSWORD"),
  },
};

export { sitesConfig };
