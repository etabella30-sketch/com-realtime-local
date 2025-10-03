module.exports = {
  apps: [
    {
      name: 'realtime',
      script: 'main.js',
      interpreter: 'node',
      exec_mode: 'fork',       // ensure single instance (no cluster)
      instances: 1,            // explicitly one instance
      autorestart: true,
      watch: false,
      max_memory_restart: '4G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    // {
    //   name: 'search-api',
    //   script: 'python',
    //   interpreter: 'none',      // tell PM2 not to override
    //   args: [
    //     '-m', 'hypercorn',
    //     '--config', 'search/hypercorn_config.py',
    //     'search/search:app'
    //   ],
    //   exec_mode: 'fork',        // single instance
    //   instances: 1,             // explicitly one instance
    //   autorestart: true,
    //   max_restarts: 5,          // limit auto-restarts to 5 times
    //   watch: false,
    //   max_memory_restart: '1G',
    //   env: {
    //     PYTHON_ENV: 'development'
    //   },
    //   env_production: {
    //     PYTHON_ENV: 'production'
    //   }
    // }
  ]
};
