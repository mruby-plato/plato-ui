// constants
MSGS = [
  'main_top',
  'app_name',
  'grp_setting',
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

// onload event handler
window.addEventListener("load", function() {
  var prjname = document.getElementById('prjname');
  prjname.value = getProject().name;

  /* initialize words */
  this.document.title = MSG.main_title;
  MSGS.forEach(function(id, _idx, _ary) {
    document.getElementById(id).innerText = MSG[id];
  })
}, false);
