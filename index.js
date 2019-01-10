const platform = require('connect-platform');


platform
  .configure({
    root: __dirname,
    port: 4000,
    panel: {
      expose: true
    },
    nodes: {
      module: [
        'connect-platform/platform/bind/panel',
        'connect-platform/platform/bind/utils',
        'panel-generated',
      ]
    }
  });

try {
  let panelconf = require('./panel-generated/platform-config');
  platform.configure(panelconf);
} catch(err) {}

try {
  require('./panel-generated/platform-config.script');
} catch(err) {}

try {
  if (process.env.CONNECT_PRODUCTION_MODE) {
    let prodconf = require('./panel-generated/platform-config.prod');
    platform.configure(prodconf);
  }
} catch(err) {}

if (process.env.CONNECT_PANEL_SECRET)
  platform.configure({
    panel: {
      secret: process.env.CONNECT_PANEL_SECRET
    }
  });

if (process.env.CONNECT_PROJECT_NAME)
  platform.configure({
    name: process.env.CONNECT_PROJECT_NAME
  });

if (process.env.CONNECT_INSTANCE_AUTO_SLEEP)
  platform.configure({
    instance_auto_sleep: process.env.CONNECT_INSTANCE_AUTO_SLEEP
  });

platform.start()
  .then(server => {
    console.log(`running on http://${server.address().address}` +
                `:${server.address().port}`);
  });
