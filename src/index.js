import env from 'react-native-config'

const config = {
  api: {
    //host: env.API_HOST,
    host: 'digital-seat-250614.ts.r.appspot.com',
    timeout: 20000
  }
};

const API_HOST = config.api.host;

export {
  API_HOST
}

export default config
