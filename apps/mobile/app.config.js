module.exports = ({ config }) => {
  const getApiUrl = () => {
    switch (process.env.ENV) {
      case "dev": {
        return {
          android: "http://10.0.2.2:3000",
          ios: "http://localhost:3000",
          web: "http://localhost:3000",
        };
      }
      case "staging": {
        return "animavita-backend.fly.dev";
      }
      case "prod": {
        return "http://api.animavita.com";
      }
    }
  };

  return {
    ...config,
    extra: {
      apiUrl: getApiUrl(),
    },
  };
};
