module.exports = {
  apps: [{
    name: '',
    script: "./src/server.js",
    instances: 1,
    watch: true,
    instance_var: '1',
    env_dev: {
      NODE_ENV: 'dev'
    },
    env_release: {
      NODE_ENV: 'release'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
