// constants
MSGS = [
  'new_app',
  'open_app',
]

// open main window
function openMain() {
  // window.open(mainPage, 'Plato2', 'width=680,height=900,scrollbars=yes');
  window.location.replace(mainPage);
  var sh = window.parent.screen.height;
  var win = mainWindow.getCurrentWindow();
  win.setResizable(true);
  win.setMinimumSize(680, 330);
  win.setMaximumSize(680, Math.min(sh, 900));
  win.maximize();
  win.setMaximumSize(680, sh);  // reset maximize size
}

// select exist project
function openJob() {
  var selFile = document.getElementById('sel_file');
  selFile.click();
}

function changeLang(lang) {
  var prev = sessionStorage.lang;
  sessionStorage.lang = lang;
  if (lang == 'ja') {
    LANG = LANG_JA;
    document.getElementById('lang_ja').style.display = 'none';
    document.getElementById('lang_en').style.display = 'block';
  }
  else {
    LANG = LANG_EN;
    document.getElementById('lang_ja').style.display = 'block';
    document.getElementById('lang_en').style.display = 'none';
  }
  if (prev != lang) {
    location.reload();
  }
}

// onload event handler
window.addEventListener("load", function() {
  /* initialize project */
  initProject();
  /* initialiez setting */
  initSetting();

  /* initialize words */
  MSGS.forEach(function(id, _idx, _ary) {
    document.getElementById(id).innerText = MSG[id];
  })

  /* add file open dialog handler */
  var selFile = document.getElementById('sel_file');
  selFile.onchange = function (e) {
    if (selFile.files.length > 0) {
      var reader = new FileReader();
      reader.onload = function(e) {
        try {
          // TODO: check project
          sessionStorage.project = e.target.result;
          project = getProject();

          document.getElementById('open_app_file').innerText = getMessage('open_app_file', project.name);
          document.getElementById('show_open').style.display = 'block';
        }
        catch(e) {
          alert(MSG.open_app_err);
        }
      }
      reader.readAsText(selFile.files[0]);
    }
  }

  changeLang(sessionStorage.lang);
}, false);
