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
const fs = require('fs');

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
  'digital_in': { 'pin': 1 },
  'analog_in': { 'pin': 1 },
  // timings
  'interval': { 'interval_time': 1, 'interval_time_unit': 'hour' },
  // actions
  'bluetooth': {},
};

// characters

const LF = "\n";
const CR = "\r";
const BR = "<br />";
const SP = "&nbsp;"

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
var targetJob = {name:"", sensor:[], timing:[], action:[]};

// paths
var platoRoot = app.getPath('home') + '/plato2';
// var uiPath = platoRoot + '/ui';
var settingPath = platoRoot + '/settings';

// // setting information
// var setting = {
//   name: "",
//   bt_setting: {
//     grpid: "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF",
//     devid: "000000",
//     devcnt: 1
//   },
//   lora_setting: {
//     custom: false,
//     deveui: "",
//     appeui: "",
//     appkey: ""
//   }
// };

// max job count (for job number)
// var maxJobCount = 0;

// // for test
// jobList.push({
//   sensor:[{type:'temperature'}, {type:'humidity'}],
//   timing:[{type:'interval'}],
//   action:[{type:'bluetooth'}]
// });
// jobList.push({
//   sensor:[{type:'distance'}],
//   timing:[{type:'ontime'}],
//   action:[{type:'bluetooth'}]
// });
// jobList.push({
//   sensor:[{type:'vibration'}],
//   timing:[{type:'trigger'}],
//   action:[{type:'onoff'}]
// });

// targetJob = JSON.parse(JSON.stringify(jobList[0])); // deep copy

//
// global functions
//

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

// Inspect job items
function inspectJobItem(item) {
  var str = '';
  switch (item.type) {
    case 'digital_in':  str = inspectDigitalIn(item); break;
    case 'analog_in':   str = inspectAnalogIn(item);  break;
    case 'interval':    str = inspectInterval(item);  break;
    case 'bluetooth':   str = inspectBluetooth(item); break;
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
  // for test
  // var jobList = [];
  // jobList.push({
  //   sensor:[{type:'temperature'}, {type:'humidity'}],
  //   timing:[{type:'interval'}],
  //   action:[{type:'bluetooth'}]
  // });
  // jobList.push({
  //   sensor:[{type:'distance'}],
  //   timing:[{type:'ontime'}],
  //   action:[{type:'bluetooth'}]
  // });
  // jobList.push({
  //   sensor:[{type:'vibration'}],
  //   timing:[{type:'trigger'}],
  //   action:[{type:'onoff'}]
  // });

  // initialize project information
  project.name = "My application";
  project.jobList = jobList;
  sessionStorage.project = JSON.stringify(project);

  // initialize job counter
  // sessionStorage.maxJobCount = 0;
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

function inProgress() {
  alert("WORK IN PROGRESS !\nComing soon...");
}

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

//
// Initialize process
//

// Initialize language
if (!sessionStorage.lang) {
  sessionStorage.lang = 'ja';
}
LANG = sessionStorage.lang == 'ja' ? LANG_JA : LANG_EN;
