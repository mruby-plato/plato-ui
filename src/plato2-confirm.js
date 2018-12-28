//
//  plato2-confirm.js
//

// constants
MSGS = [
  'confirm_top',
  'prev',
  'confirm_create',
]

// functions

// generate application JSON
function makeApplication() {
  let project = getProject();
  let appRoot = getAppPath();
  mkdir(appRoot);
  saveFile(appRoot + '/app.json', sessionStorage.project);
  // launch `projmaker.rb`
  let cmd = 'ruby ' + getToolPath() + '/prjmaker.rb ' + appRoot;
  launchApplication(cmd);

  alert(MSG.conf_done);
  app.quit();
}

// format sensor information
function formatSensors(sensors) {
  let txt = '';
  sensors.forEach(function(sensor, i) {
    // txt += TAB + TAB + TAB + trigParameter[sensor.type] + LF;
    txt += inspectJobItem(sensor, TAB, LF, 3);
  })
  return txt;
}

// format timing information
function formatTimings(timings) {
  let txt = '';
  timings.forEach(function(timing, i) {
    let params = timing.params
    switch (timing.type) {
    case 'ontime':
      txt += tabs(3) + MSG.tim_time + ':' + LF;
      break;
    case 'part_time':
      txt += tabs(3) + MSG.tim_part + ':' + LF;
      break;
    case 'interval':
    case 'trigger':
      txt += inspectJobItem(timing, TAB, LF, 3);
      break;
    }
  })
  return txt;
}

// format action information
function formatActions(actions) {
  let txt = '';
  actions.forEach(function(action, i) {
    let params = action.params;
    switch (action.type) {
    case 'bluetooth':
      txt += inspectJobItem(action, TAB, LF, 3);
      break;
    }
  })
  return txt;
}

// format network setting
function formatNetworkSettings(setting) {
  let txt = '';
  txt += MSG.conf_app_bridge + LF;
  txt += tabs(1) + MSG.bt_setting + LF;
  txt += tabs(2) + MSG.bt_id + ' ' + setting.bt_setting.grpid + LF;
  txt += tabs(2) + MSG.bt_dev_id + ' ' + digits(setting.bt_setting.devid, 6);
  if (setting.bt_setting.devcnt > 1) {
    txt += ' .. ' + getEndDevId(setting.bt_setting.devid, setting.bt_setting.devcnt);
  }
  txt += LF;
  txt += tabs(2) + MSG.bt_dev_cnt + ' ' + setting.bt_setting.devcnt + LF;
  txt += LF;
  txt += tabs(1) + MSG.lora_setting + LF;
  if (setting.lora_setting.custom) {
    txt += tabs(2) + "DevEUI: " + setting.lora_setting.deveui + LF;
    txt += tabs(2) + "AppEUI: " + setting.lora_setting.appeui + LF;
    txt += tabs(2) + "AppKey: " + setting.lora_setting.appkey + LF;
  }
  else {
    txt += tabs(2) + MSG.default;
  }
  return txt;
}

// onload event handler
window.addEventListener("load", function() {
  /* Get joblist from sessionStorage */
  let project = getProject();
  let jobList = project.jobList;

  /* initialize words */
  document.title = MSG.confirm_title;
  MSGS.forEach(function(id, _idx, _ary) {
    document.getElementById(id).innerText = MSG[id];
  })
  
  // build up application settings
  let conf = document.getElementById('conf_app');
  let txt = MSG.conf_app_device + LF;
  jobList.forEach(function(job, i) {
    // job名
    txt += tabs(1) + job.name + LF;
    // sensor
    txt += tabs(2) + MSG.tab_sensor + ':' + LF;
    txt += formatSensors(job.sensor);
    // timing
    txt += tabs(2) + MSG.tab_timing + ':' + LF;
    txt += formatTimings(job.timing);
    // action
    txt += tabs(2) + MSG.tab_action + ':' + LF;
    txt += formatActions(job.action);
  });

  txt += LF;
  // Build up network settings
  txt += formatNetworkSettings(project.setting);

  conf.innerText = txt;

  // connect job items
  connectItems();
}, false);
