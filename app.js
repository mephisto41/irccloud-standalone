var activeSearchNumber = -1;
var totalSearchNumber = -1;

var updateSearchResult = function() {
  var searchResult = document.getElementById("search-result");

  if (activeSearchNumber < 0 || totalSearchNumber < 0) {
    searchResult.innerHTML = "";
  } else if (activeSearchNumber === 0 || totalSearchNumber === 0) {
    searchResult.innerHTML = "Not Found";
  } else {
    searchResult.innerHTML = activeSearchNumber + " / " + totalSearchNumber;
  }
}

var toggleSearchBar = function() {
  var searchBar = document.getElementById("search-footer");
  if (searchBar.style.display != "block") {
    searchBar.style.display = "block";

    activeSearchNumber = -1;
    totalSearchNumber = -1;
    updateSearchResult();
    // Focus on text input.
    var searchText = document.getElementById("searchtext");
    searchText.focus();
  } else {
    searchBar.style.display = "none";

    // Clear search result.
    var webview = document.getElementById("ircmain");
    webview.stopFindInPage("clearSelection");
  }
}

var registerSearchFunction = function() {
  var webview = document.getElementById("ircmain");
  var searchInPage = function(searchForward) {
    var searchText = document.getElementById("searchtext");
    var matchCase = document.getElementById("search-match-case");
    if (searchText.value) {
      webview.findInPage(searchText.value, {forward: searchForward, matchCase: matchCase.checked});
    }
  }

  var searchUp = document.getElementById("searchup");
  searchUp.onclick = function() {
    searchInPage(false);
  }

  var searchDown = document.getElementById("searchdown");
  searchDown.onclick = function() {
    searchInPage(true);
  }

  var searchText = document.getElementById("searchtext");
  searchText.onkeypress = function(e) {
    if (e.keyCode == 13) {
      searchInPage(!e.getModifierState("Shift"));
      return false;
    }

    return true;
  }

  var searchClose = document.getElementById("searchclose");
  searchClose.onclick = function() {
    toggleSearchBar();
  }

  webview.addEventListener('found-in-page', function(e) {
    if (e.result.activeMatchOrdinal) {
      activeSearchNumber = e.result.activeMatchOrdinal;
    }

    if (e.result.finalUpdate) {
      totalSearchNumber = e.result.matches;
      updateSearchResult();
    }
  });
}

onload = function() {
  var webview = document.getElementById("ircmain");

  webview.addEventListener("new-window", function(e) {
    try {
      require('shell').openExternal(e.url)
    } catch(error) {
      console.log("Ignoring #{e.url} due to #{error.message}")
    }
  });

  registerSearchFunction();
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
      },
      {
        label: 'Find',
        accelerator: 'Cmd+F',
        click: toggleSearchBar
      }
    ]
  },
];

menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);
