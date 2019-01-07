// constants
MSGS = [
  'new_app',
  'open_app',
]

// open main window
function openMain() {
  // window.open(mainPage, 'Plato2', 'width=680,height=900,scrollbars=yes');
  window.location.replace(mainPage);
  let sh = window.parent.screen.height;
  let win = mainWindow.getCurrentWindow();
  win.setResizable(true);
  win.setMinimumSize(720, 340);
  win.setMaximumSize(720, Math.min(sh, 900));
  win.maximize();
  win.setMaximumSize(720, sh);  // reset maximize size
}

// select exist project
function openJob() {
  let selFile = document.getElementById('sel_file');
  selFile.click();
}

function changeLang(lang) {
  let prev = sessionStorage.lang;
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
  let selFile = document.getElementById('sel_file');
  selFile.onchange = function (e) {
    if (selFile.files.length > 0) {
      let reader = new FileReader();
      reader.onload = function(e) {
        try {
          // TODO: check project
          sessionStorage.project = e.target.result;
          project = getProject();
          openMain();
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
