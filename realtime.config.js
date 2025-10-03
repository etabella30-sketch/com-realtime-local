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
    {
      name: 'search-python',
      script: 'search.py',
      interpreter: 'python',
      exec_mode: 'fork',       // single-instance for Python as well
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        PYTHON_ENV: 'production'
      }
    }
  ]
};
