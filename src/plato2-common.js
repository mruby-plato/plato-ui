//
//  plato-common.js
//

//
// constants
//

// requires
const app = require('electron').remote.app;
const mainWindow = require('electron').remote;
const prompt = require('electron-prompt');
const os = require('os');
const fs = require('fs');

// platforms
const OS_WINDOWS  = 'Windows';
const OS_MAC      = 'Darwin';
const OS_LINUX    = 'Linux';

// languages
const MSG = {};
const LANG_EN = 0;
const LANG_JA = 1;

// pages
const mainPage = 'plato2-main.html';
const networkPage = 'plato2-network.html';
const listPage = 'plato2-joblist.html';
const editPage = 'plato2-addjob.html';
const confirmPage = 'plato2-confirm.html';

// job types
const jobTypes = ['sensor', 'timing', 'action'];

// Job items
const jobItems = {
  // sensors
  'air_pressure': {'img': 'img/air-pressure.png'},
  'analog_in':    {'img': 'img/analogin.png', 'setting': true},
  'angle':        {'img': 'img/angle.png'},
  'battery':      {'img': 'img/battery.png'},
  'digital_in':   {'img': 'img/digitalin.png', 'setting': true},
  'velocity':     {'img': 'img/gps-direction.png'},
  'humidity':     {'img': 'img/humidity.png'},
  'distance':     {'img': 'img/gps-location.png'},
  'temperature':  {'img': 'img/temperature.png'},
  'vibration':    {'img': 'img/vibration.png'},
  // timings
  'interval':     {'img': 'img/interval.png', 'setting': true},
  'ontime':       {'img': 'img/ontime.png', 'setting': true},
  'part_time':    {'img': 'img/part-time.png', 'setting': true},
  'trigger':      {'img': 'img/trigger.png', 'setting': true},
  // actions
  'bluetooth':    {'img': 'img/bluetooth.png', 'setting': true},
  'gpio':         {'img': 'img/gpio.png', 'setting': true},
  'onoff':        {'img': 'img/onoff.png', 'setting': true},
};

// default settings
const defaultParams = {
  // sensors
  'temperature': {},
  'humidity': {},
  'air_pressure': {},
  'distance': {},
  'velocity': {},
  'angle': {},
  'battery': {},
  'digital_in': { 'pin': 1 },
  'analog_in': { 'pin': 1 },
  'vibration': {},
  // timings
  'interval': { 'interval_time': 1, 'interval_time_unit': 'hour' },
  'ontime': { 'times': [] },
  'part_time': { 'part_start': '9:00', 'part_end': '18:00' },
  'trigger': { trig_period: 30, trig_peri_unit: 'minute',
    triggers: [], trig_off: true,
    trig_delay: false, trig_delay_time: 30, trig_delay_unit: 'minute',
    while_trig_on: false, while_trig_time: 1, while_trig_unit: 'hour'},
  // actions
  'bluetooth': {},
  'gpio': {},
  'onoff': {},
};

// characters

const LF = "\n";
const CR = "\r";
const BR = "<br />";
const SP = "&emsp;"
const TAB = "    ";

// trigger parameters (sensors)
const trigParameter = {};
const trigParamUnit = {};

// trigger conditions
const trigCondition = {};

// and/or
const andOr = {};

//
// language
//

var LANG = LANG_EN;

//
// global variables
//

// project information
var project = {
  name: "",
  jobList: [],
  maxJobCount: 0,
  setting: {}
};
var jobList = [];
var targetJob = {id:0, name:"", sensor:[], timing:[], action:[]};


//
// global functions
//

//------------------------------
// Platform
//------------------------------

// get OS type
function getOS() {
  var osTypeName = os.type().toString();
  var os_type = 'Unknown';
  [OS_WINDOWS, OS_MAC, OS_LINUX].forEach(function(ele, idx, target) {
    if (osTypeName.match(ele)) os_type = ele;
  });
  return os_type;
}

// get install path
function getInstPath() {
  // TODO: refer ~/.plato/plato2.cfg
  var home = (getOS() === OS_WINDOWS) ? 'c:/' : app.getPath('home');
  return home + '/plato2';
}

//------------------------------
// Drawing
//------------------------------

// Connect job items.
function connectItems() {
  var cvs = document.getElementById("mycanvas");
  if (!cvs || !cvs.getContext) { return false; }
  var cvsrect = cvs.getBoundingClientRect();

  var ctx = cvs.getContext("2d");
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  ctx.beginPath();
  ctx.strokeStyle = "rgb(255, 192, 192)";
  ctx.lineWidth = 5;

  var jobcnt = document.getElementsByName("sensors").length;
  for (var job=0; job<jobcnt; job++) {
    // Get sensors, timings and actions
    var sensors = document.getElementsByName("sensors")[job].children;
    var timings = document.getElementsByName("timings")[job].children;
    var actions = document.getElementsByName("actions")[job].children;

    // connect sensor to timing
    var ss, tt, aa;
    var srect, trect, arect;
    for (ss=0; ss<sensors.length; ss++) {
      srect = sensors[ss].getBoundingClientRect();
      for (tt=0; tt<timings.length; tt++) {
        trect = timings[tt].getBoundingClientRect();
        ctx.moveTo(srect.left + srect.width / 2 - cvsrect.left,
                    srect.top + srect.height / 2 - cvsrect.top);
        ctx.lineTo(trect.left + trect.width / 2 - cvsrect.left,
                    trect.top + trect.height / 2 - cvsrect.top);
      }
    }
    // connect timing to action
    for (tt=0; tt<timings.length; tt++) {
      trect = timings[tt].getBoundingClientRect();
      for (aa=0; aa<actions.length; aa++) {
        arect = actions[aa].getBoundingClientRect();
        ctx.moveTo(trect.left + trect.width / 2 - cvsrect.left,
                  trect.top + trect.height / 2 - cvsrect.top);
        ctx.lineTo(arect.left + arect.width / 2 - cvsrect.left,
                  arect.top + arect.height / 2 - cvsrect.top);
      }
    }
    ctx.stroke();
  }
}
const flgNoIcon       = 0x0000;
const flgDeleteIcon   = 0x0001;
const flgSettingIcon  = 0x0002;
const flgHint         = 0x0004;

const flgDefaultIcon  = (flgDeleteIcon | flgSettingIcon | flgHint);

//------------------------------
// IoT Job utilities
//------------------------------

// Inspect sensor
function inspectSensor(sensor, tab=SP, lf=BR, ind=0) {
  return tabs(ind, tab) + sensor + lf;
}

// Inspect digital_in setting
function inspectDigitalIn(item, tab=SP, lf=BR, ind=0) {
  return tabs(ind, tab) + MSG.sen_din + lf
    + tabs(ind + 1, tab) + MSG.set_din_pin + ' ' + item.params.pin + lf;
}

// Inspect analog_in setting
function inspectAnalogIn(item, tab=SP, lf=BR, ind=0) {
  return tabs(ind, tab) + MSG.sen_ain + lf
    + tabs(ind + 1, tab) + MSG.set_ain_pin + ' ' + item.params.pin + lf;
}

// Inspect interval setting
function inspectInterval(item, tab=SP, lf=BR, ind=0) {
  var str = tabs(ind, tab) + MSG.set_int_title + lf
    + tabs(ind + 1, tab) + MSG.set_int_period + ' '
    + item.params.interval_time
    + MSG[item.params.interval_time_unit] + lf;
  if (item.params.interval_start) {
    str += tabs(ind + 1, tab) + MSG.set_int_start + ' ' + item.params.interval_start + lf;
  }
  if (item.params.interval_end) {
    str += tabs(ind + 1, tab) + MSG.set_int_end + ' ' + item.params.interval_end + lf;
  }
  return str;
}

// Inspect on time setting
function inspectOnTime(item, tab=SP, lf=BR, ind=0) {
  var str = tabs(ind, tab) + MSG.set_tim_title + lf;
  str += tabs(ind + 1, tab) + MSG.set_tim_time + lf;
  if (item.params.times.length == 0) {
    str += tabs(ind + 2, tab) + MSG.set_tim_none + lf;
    return str;
  }
  item.params.times.forEach(function(time, i) {
    str += tabs(ind + 2, tab) + time + lf;
  });
  return str;
}

// Inspect part time setting
function inspectPartTime(item, tab=SP, lf=BR, ind=0) {
  var str = tabs(ind, tab) + MSG.set_par_title + lf;
  str += tabs(ind + 1, tab) + MSG.set_par_start + ' ' + item.params.part_start + lf;
  str += tabs(ind + 1, tab) + MSG.set_par_end + ' ' + item.params.part_end + lf;
  return str;
}

// Inspect Bluetooth setting
function inspectBluetooth(item, tab, lf, ind) {
  var cnt = 0;
  var str = tabs(ind, tab) + MSG.set_bt_title + lf
    + tabs(ind + 1, tab) + MSG.set_bt_data + lf;
  for (key in item.params) {
    if (item.params[key]) {
      str += tabs(ind + 2, tab) + trigParameter[key] + lf;
      cnt++;
    }
  }
  if (cnt == 0) {
    str += tabs(ind + 2, tab) + MSG.none + lf;
  }
  return str;
}

function getJobByID(jobid) {
  var job = {name:''};
  jobs = getProject().jobList;
  jobs.forEach(function(_job, i) {
    if (_job.id == jobid) job = _job;
  })
  return job;
}

// Inspect On/Off setting
function inspectOnOff(item, tab=SP, lf=BR, ind=0) {
  var str = tabs(ind, tab) + MSG.act_swi + lf;
  str += tabs(ind + 1, tab) + MSG.set_job_name + ' ';
  if (getJobByID(item.params.jobid).name === '') {
    str += MSG.set_job_notsel + lf;
  }
  else {
    str += getJobByID(item.params.jobid).name + lf;
    str += tabs(ind + 1, tab) + MSG.set_job_ctrl + ' ' + MSG[(item.params.onoff == 0) ? 'on' : 'off'] + lf;
  }
  return str;
}

// Inspect job items
function inspectJobItem(item, tab=SP, lf=BR, ind=0) {
  var str = '';
  switch (item.type) {
    // Sensors
    case 'digital_in':    str = inspectDigitalIn(item, tab, lf, ind); break;
    case 'analog_in':     str = inspectAnalogIn(item, tab, lf, ind);  break;
    case 'temperature':   str = inspectSensor(MSG.sen_temp, tab, lf, ind);  break;
    case 'humidity':      str = inspectSensor(MSG.sen_humi, tab, lf, ind);  break;
    case 'air_pressure':  str = inspectSensor(MSG.sen_pres, tab, lf, ind);  break;
    // case 'vibration':     str = inspectSensor(MSG.sen_vibr, tab, lf, ind);  break;
    case 'angle':         str = inspectSensor(MSG.sen_angl, tab, lf, ind);  break;
    case 'distance':      str = inspectSensor(MSG.sen_loca, tab, lf, ind);  break;
    case 'velocity':      str = inspectSensor(MSG.sen_velo, tab, lf, ind);  break;
    case 'battery':       str = inspectSensor(MSG.sen_batt, tab, lf, ind);  break;
    // Timings
    case 'interval':      str = inspectInterval(item, tab, lf, ind);  break;
    case 'ontime':        str = inspectOnTime(item, tab, lf, ind);    break;
    case 'part_time':     str = inspectPartTime(item, tab, lf, ind);  break;
    case 'trigger':       str = inspectTrigger(item, tab, lf, ind);   break;
    // Actions
    case 'bluetooth':     str = inspectBluetooth(item, tab, lf, ind); break;
    case 'onoff':         str = inspectOnOff(item, tab, lf, ind); break;
  }
  return str;
}

// Get HTML of job items.
//  job:  job info.
//  type: jobtype (sensor / timing / action)
//  dispIcon: ICON display flag.
//    flgDeleteIcon:  Delete (left-top)
//    flgSettingIcon: Settings (right-top)
function htmlJobItems(job, type, dispIcon=flgDefaultIcon) {
  var items = job[type];
  var html = "";
  var i;
  for (i=0; i<items.length; i++) {
    html += '<div class="item" name="' + type + '/' + items[i]['type'] + '/' + i + '">';
    html += '<img src="' + jobItems[items[i]['type']]['img'] + '" width="100" height="100">';
    html += '<div class="icon">'
    if (dispIcon & flgDeleteIcon) {
      html += '<div class="l" name="del_icon"><img src="img/minus.png" width="32" height="32"></div>';
    }
    if ((dispIcon & flgSettingIcon) &&
        jobItems[items[i]['type']]['setting']) {
      html += '<div class="r" name="set_icon"><img src="img/settings.png" width="32" height="32"></div>';
    }
    if ((dispIcon & flgHint) &&
        items[i]['params']) {
      html += '<div class="hint" id=_' + items[i].type + i + '>';
      html += inspectJobItem(items[i]);
      html += '</div>';
    }
    html += '</div></div>' + LF;
  }
  return html.trim();
}

// Show jobitem.
//  job:  job info.
//  idx:  job index
//  type: job type (sensor / timing / action)
function showJobItem(job, idx, type) {
  // check job type
  if (jobTypes.indexOf(type) < 0) return;

  // get target job type
  var targs = document.getElementsByName(type + 's');

  // make html
  targs[idx].innerHTML = htmlJobItems(job, type);

  // add del_icon handler
  var icons = document.getElementsByName("del_icon");
  [].forEach.call(icons, function(icon) {
    icon.addEventListener('click', handleDelIconClick, false);
  })
  // add set_icon handler
  icons = document.getElementsByName("set_icon");
  [].forEach.call(icons, function(icon) {
    icon.addEventListener('click', handleSetIconClick, false);
  })

  // connect job items
  connectItems();
}

// Initialize project
function initProject() {
  // initialize project information
  project.name = "My application";
  project.jobList = jobList;
  sessionStorage.project = JSON.stringify(project);
}

// Get project information from sessionStorage
function getProject() {
  return JSON.parse(sessionStorage.project);
}

// Set project information into sessionStorage
function setProject(project) {
  sessionStorage.project = JSON.stringify(project);
}

function setJob(idx, job) {
  var prj = getProject();
  var jobs = prj.jobList;
  if (idx < jobs.length) {
    jobs[idx] = job;
  }
  else {
    jobs.push(job);
  }
  setProject(prj);
}

// Initialize setting
function initSetting(name) {
  var setting = {
    bt_setting: {},
    lora_setting: {}
  };
  // initialize setting information
  if (typeof name === 'undefined')
    setting.name = '';
  else
    setting.name = name;

  setting.bt_setting.grpid  = "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";
  setting.bt_setting.devid  = "000000";
  setting.bt_setting.devcnt = 1;
  setting.lora_setting.custom = false;
  setting.lora_setting.deveui = "";
  setting.lora_setting.appeui = "";
  setting.lora_setting.appkey = "";

  project = getProject();
  project.setting = setting;
  setProject(project);
}

// Get setting information from sessionStorage
function getSetting() {
  return getProject().setting;
}

// Set setting information into sessionStorage
function setSetting(setting) {
  project = getProject();
  project.setting = setting;
  setProject(project);
}

//------------------------------
// Utilities
//------------------------------

// input Hex value
//  elem: input element (e.g. textbox)
function inputHex(elem) {
  var val = elem.value;
  if (val.length > 0) {
    if (isNaN('0x' + val[val.length - 1])) {
      elem.value = val.substring(0, val.length - 1);
      return;
    }
    elem.value = val.toUpperCase();
  }
}

// input uuid value
//  elem: input element (e.g. textbox)
//  temp: previous data (hidden field)
function inputUUID(elem, temp) {
  var prev = document.getElementById(temp);
  var val = elem.value;
  var add = false;
  if (val.length > prev.value.length) {
    // add hex digit
    // hex check
    if (isNaN('0x' + val[val.length - 1])) {
      elem.value = prev.value;
      return;
    }
    add = true;
  }

  // format uuid
  switch (val.length) {
  case 8:
  case 13:
  case 18:
  case 23:
    if (add)  val += '-';
    else      val = val.substring(0, val.length - 1);
    break;
  }

  prev.value = elem.value = val.toUpperCase();
}

// get N digits string
//  val:  value
//  cnt:  digits
function digits(val, cnt) {
  dig = '';
  for (i=0; i<cnt-1; i++) dig += '0';
  return (dig + val).slice(-cnt);
}

// get end of device id (6 digits in hexadicimal)
//  sid: start of device ID (Hex string)
//  cnt: number of device IDs (Dec string)
function getEndDevId(sid, cnt) {
  return digits((parseInt(sid, 16) + parseInt(cnt, 10) - 1).toString(16).toUpperCase(), 6);
}

// tab
function tabs(n, tab=TAB) {
  txt = '';
  for (var i=0; i<n; i++) txt += tab;
  return txt;
}

function spaces(n, spc=SP) {
  txt = '';
  for (var i=0; i<n; i++) txt += spc;
  return txt;
}

//------------------------------
// Test and Debug
//------------------------------

function inProgress() {
  alert("WORK IN PROGRESS !\nComing soon...");
}

//------------------------------
// File operations
//------------------------------

// loda group setting file
function loadSettingFile(name) {
  try {
    var rawSetting = fs.readFileSync(name);
    var setting = JSON.parse(rawSetting);
    setSetting(setting);
  }
  catch(e) {
    alert(MSG.open_set_err);
  }
}

// save file
function saveFile(name, data) {
  fs.writeFile(name, data, 'utf8', function(err) {
    if (err) {
      alert(err);
    }
  });
}

// check file exists
function isFileExist(name) {
  try {
    fs.statSync(name);
    return true;
  }
  catch (err) {
    // file not exist
  }
  return false;
}

// get group setting list
function enumGroupSettings() {
  var files = fs.readdirSync(settingPath);
  var settings = [];
  files.filter(function(file) {
    return fs.statSync(getSettingPath() + '/' + file).isFile && /.*\.json$/.test(file);
  }).forEach(function(file) {
    settings.push(file.replace(/\.json$/, ""))
  })

  return settings;
}

// get settings path
function getSettingPath() {
  return platoRoot + '/settings';
}

// get application path
function getAppPath() {
  return platoRoot + '/' + getProject().name.replace(/ /g, '_');
}

// get tool path
function getToolPath() {
  return platoRoot + '/.plato/tools';
}

// mkdir
function mkdir(path) {
  try {
    fs.mkdirSync(path);
  }
  catch(err) {
    if (err.code !== 'EEXIST') {
      alert(err);
    }
  }
}

//------------------------------
// Process utilities
//------------------------------

// launch native application
function launchApplication(cmd) {
  try {
    var exec = require('child_process').exec;
    execApp = function() {
      return exec(cmd, {},
        function(error, stdout, stderr) {
          console.log('stdout: '+(stdout||'none'));
          console.log('stderr: '+(stderr||'none'));
          if(error !== null) {
            console.log('exec error: '+error);
          }
        }
      )
    };
    execApp();

  } catch(e) {
    console.log(e.message);
    alert(e.message);
  }
}

//------------------------------
// Initialize process
//------------------------------

// Initialize language
if (!sessionStorage.lang) {
  sessionStorage.lang = 'ja';
}
LANG = sessionStorage.lang == 'ja' ? LANG_JA : LANG_EN;

// paths
const platoRoot = getInstPath();
const settingPath = platoRoot + '/settings';
