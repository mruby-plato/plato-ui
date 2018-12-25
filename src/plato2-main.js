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
  var prj = getProject();
  prj.name = document.getElementById('prjname').value;
  setProject(prj);

  window.location.replace(listPage);
}

function openSettingPage(index) {
  initSetting();
  if (index > 1) {
    var sel = document.getElementById('grp_list');
    var setting = sel.children[index].text;
    var setting_name = getSettingPath() + '/' + setting + '.json';
    loadSettingFile(setting_name);
  }
  window.location.replace(networkPage);
}

// on Group setting change
function onGroupChange() {
  var sel = document.getElementById('grp_list');
  switch (sel.selectedIndex) {
  case 0:   /* New setting */
    openSettingPage(0);
    break;
  case 1:   /* Clear setting */
    initSetting();
    break;
  default:  /* Load setting */
    var setting = sel.children[sel.selectedIndex].text;
    var setting_name = getSettingPath() + '/' + setting + '.json';
    loadSettingFile(setting_name);
    break;
  }
}

// onload event handler
window.addEventListener("load", function() {
  var prjname = document.getElementById('prjname');
  prjname.value = getProject().name;

  /* initialize words */
  this.document.title = MSG.main_title;
  MSGS.forEach(function(id, _idx, _ary) {
    document.getElementById(id).innerText = MSG[id];
  })

  /* initialize group setting list */
  var setting = getSetting();
  var settings = enumGroupSettings();
  var sel = document.getElementById('grp_list');
  while(sel.children.length > GROUP_HEADER_LINES) {
    sel.removeChild(sel.lastChild);
  }
  settings.forEach(function (set, i, ary) {
    var op = document.createElement("option");
    op.value  = set;
    op.text   = set;
    sel.appendChild(op);
    if (set === setting.name) {
      sel.selectedIndex = i + GROUP_HEADER_LINES;
    }
  });
}, false);
