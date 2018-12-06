//
//  plato2-confirm.js
//

// constants
MSGS = [
  'confirm_top',
  'prev',
  'confirm_create',
]

const TAB = "    ";

// functions

// generate application JSON
function makeApplication() {
  var output = new Blob([sessionStorage.project], {type: "text/plain"});
  project = getProject();
  var a = document.createElement('a');
  a.href = URL.createObjectURL(output);
  a.download = project.name.trim().replace(/[- ]/g, '_') + '.json';
  a.target = '_blank';
  a.href = URL.createObjectURL(output);
  a.click();
}

// onload event handler
window.addEventListener("load", function() {
  /* Get joblist from sessionStorage */
  project = getProject();
  jobList = project.jobList;

  /* initialize words */
  document.title = MSG.confirm_title;
  MSGS.forEach(function(id, _idx, _ary) {
    document.getElementById(id).innerText = MSG[id];
  })
  
  // build up application settings
  var conf = document.getElementById('conf_app');
  var txt = MSG.conf_app_device + LF;
  jobList.forEach(function(job, i) {
    // job名
    txt += TAB + job.name + LF;
    // sensor
    txt += TAB + TAB + MSG.tab_sensor + ':' + LF;
    // timing
    txt += TAB + TAB + MSG.tab_timing + ':' + LF;
    // action
    txt += TAB + TAB + MSG.tab_action + ':' + LF;
    txt += LF;
  });

  txt += LF;
  txt += MSG.conf_app_bridge + LF;
  txt += TAB + MSG.bt_setting + LF;
  txt += TAB + TAB + MSG.bt_id + LF;
  txt += TAB + TAB + MSG.bt_dev_cnt + LF;
  txt += TAB + TAB + MSG.bt_dev_id + LF;
  txt += LF;
  txt += TAB + MSG.lora_setting + LF;
  txt += TAB + TAB + "DevEUI: " + LF;
  txt += TAB + TAB + "AppEUI: " + LF;
  txt += TAB + TAB + "AppKey: " + LF;

  conf.innerText = txt;

  // connect job items
  connectItems();
}, false);
