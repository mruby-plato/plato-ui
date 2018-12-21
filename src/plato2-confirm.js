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

// format sensor information
function formatSensors(sensors) {
  txt = '';
  sensors.forEach(function(sensor, i) {
    txt += TAB + TAB + TAB + trigParameter[sensor.type] + LF;
  })
  return txt;
}

// format timing information
function formatTimings(timings) {
  txt = '';
  timings.forEach(function(timing, i) {
    var params = timing.params
    switch (timing.type) {
    case 'interval':
      txt += inspectInterval(timing, TAB, LF, 3);
      break;
    case 'ontime':
      txt += tabs(3) + MSG.tim_time + ':' + LF;
      break;
    case 'part_time':
      txt += tabs(3) + MSG.tim_part + ':' + LF;
      break;
    case 'trigger':
      txt += tabs(3) + MSG.tim_trig + ':' + LF;
      txt += tabs(4) + MSG.set_tri_period + ' ' + params.trig_period + ' ' + params.trig_peri_unit + LF;
      txt += tabs(4) + MSG.set_tri_cond + LF;
      params.triggers.forEach(function(trig, i) {
        txt += tabs(5);
        if (i > 0) txt += trig.and_or + ' ';
        txt += 'TODO'
        txt += LF;
      })
      break;
    }
  })
  return txt;
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
    txt += tabs(1) + job.name + LF;
    // sensor
    txt += tabs(2) + MSG.tab_sensor + ':' + LF;
    txt += formatSensors(job.sensor);
    // timing
    txt += tabs(2) + MSG.tab_timing + ':' + LF;
    txt += formatTimings(job.timing);
    // action
    txt += tabs(2) + MSG.tab_action + ':' + LF;
    txt += LF;
  });

  txt += LF;
  txt += MSG.conf_app_bridge + LF;
  txt += tabs(1) + MSG.bt_setting + LF;
  txt += tabs(2) + MSG.bt_id + LF;
  txt += tabs(2) + MSG.bt_dev_cnt + LF;
  txt += tabs(2) + MSG.bt_dev_id + LF;
  txt += LF;
  txt += tabs(1) + MSG.lora_setting + LF;
  txt += tabs(2) + "DevEUI: " + LF;
  txt += tabs(2) + "AppEUI: " + LF;
  txt += tabs(2) + "AppKey: " + LF;

  conf.innerText = txt;

  // connect job items
  connectItems();
}, false);
