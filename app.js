onload = function() {
  var webview = document.getElementById("ircmain");

  webview.addEventListener("new-window", function(e) {
    try {
      require('shell').openExternal(e.url)
    } catch(error) {
      console.log("Ignoring #{e.url} due to #{error.message}")
    }
  });
}

// Add application menu
var remote = require('remote');
var Menu = remote.require('menu');
var template = [
  {
    label: 'IRCCloud',
    submenu: [
      {
        label: 'About IRCCloud',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide IRCCloud',
        accelerator: 'Cmd+H',
        selector: 'hide:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Cmd+Q',
        selector: 'terminate:'
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'Cmd+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+Cmd+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'Cmd+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'Cmd+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'Cmd+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'Cmd+A',
        selector: 'selectAll:'
      }
    ]
  },
];

menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);
