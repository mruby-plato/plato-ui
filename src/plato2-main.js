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
  if (document.getElementById('grp_list').selectedIndex == 0) {
    openSettingPage(0);
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
  var settings = enumGroupSettings();
  var sel = document.getElementById('grp_list');
  while(sel.children.length > 2) {
    sel.removeChild(sel.lastChild);
  }
  settings.forEach(function (setting, i, ary) {
    var op = document.createElement("option");
    op.value  = setting;
    op.text   = setting;
    sel.appendChild(op);
  });

}, false);
