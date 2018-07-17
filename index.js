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

if (process.env.CONNECT_PANEL_SECRET)
  platform.configure({
    panel: {
      secret: process.env.CONNECT_PANEL_SECRET
    }
  });

platform.start()
  .then(server => {
    console.log(`running on http://${server.address().address}` +
                `:${server.address().port}`);
  });
