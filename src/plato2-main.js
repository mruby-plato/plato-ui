// constants
MSGS = [
  'main_top',
  'app_name',
  'grp_setting',
  'new_grpset',
  'sel_grpset',
  'browse',
  'next',
]

GROUP_HEADER_LINES = 2;

function nextPage() {
  // TODO: check project name
  let prj = getProject();
  prj.name = document.getElementById('prjname').value;
  setProject(prj);

  if (prj.jobList.length > 0) {
    window.location.replace(listPage);
  }
  else {
    window.location.replace(editPage + '?index=0');
  }
}

function openSettingPage(index) {
  initSetting();
  if (index > 1) {
    let sel = document.getElementById('grp_list');
    let setting = sel.children[index].text;
    let setting_name = getSettingPath() + '/' + setting + '.json';
    loadSettingFile(setting_name);
  }
  window.location.replace(networkPage);
}

// on Group setting change
function onGroupChange() {
  let sel = document.getElementById('grp_list');
  switch (sel.selectedIndex) {
  case 0:   /* New setting */
    openSettingPage(0);
    break;
  case 1:   /* Clear setting */
    initSetting();
    break;
  default:  /* Load setting */
    let setting = sel.children[sel.selectedIndex].text;
    let setting_name = getSettingPath() + '/' + setting + '.json';
    loadSettingFile(setting_name);
    break;
  }
}

// onload event handler
window.addEventListener("load", function() {
  let prjname = document.getElementById('prjname');
  prjname.value = getProject().name;

  /* initialize words */
  this.document.title = MSG.main_title;
  MSGS.forEach(function(id, _idx, _ary) {
    document.getElementById(id).innerText = MSG[id];
  })

  /* initialize group setting list */
  let setting = getSetting();
  let settings = enumGroupSettings();
  let sel = document.getElementById('grp_list');
  while(sel.children.length > GROUP_HEADER_LINES) {
    sel.removeChild(sel.lastChild);
  }
  settings.forEach(function (set, i, ary) {
    let op = document.createElement("option");
    op.value  = set;
    op.text   = set;
    sel.appendChild(op);
    if (set === setting.name) {
      sel.selectedIndex = i + GROUP_HEADER_LINES;
    }
  });
}, false);
