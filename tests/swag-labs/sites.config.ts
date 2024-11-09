const getEnvVariable = (variable: string) => String(process.env[variable]);

const sitesConfig = {
  url: {
    baseUrl: "https://www.saucedemo.com/",
  },

  loginCredentials: {
    usernames: {
      errorUser: "error_user",
      lockedUser: "locked_out_user",
      performanceGlitchUser: "performance_glitch_user",
      problemUser: "problem_user",
      standardUser: "standard_user",
      visualUser: "visual_user",
    },
    passwords: {
      generalPassword: getEnvVariable("GENERAL_PASSWORD"),
    },
  },
};

export { sitesConfig };
