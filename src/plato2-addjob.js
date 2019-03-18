//
//  plato2-addjob.js
//

//
// constants
//

MSGS = [
  'addjob_top',
  'tab_sensor',       // Sensor tab
    'sen_temp',
    'sen_humi',
    'sen_pres',
    'sen_loca',
    'sen_velo',
    'sen_angl',
    'sen_batt',
    'sen_din',
    'sen_ain',
    'sen_illu',
  'tab_timing',       // Timing tab
    'tim_intr',
    'tim_time',
    'tim_part',
    'tim_trig',
  'tab_action',       // Action tab
    'act_bt',
    'act_swi',
    'act_gpio',
  'set_ain_title',    // Analog in
    'set_ain_pin',
  'set_din_title',    // Digital in
    'set_din_pin',
  'set_int_title',    // Interval settings
    'set_int_period',
    'set_int_per_h',
    'set_int_per_m',
    'set_int_per_s',
    'set_int_start',
    'set_int_end',
  'set_tim_title',    // On time settings
    'set_tim_time',

  'set_par_title',    // Part time settings
    'set_par_start',
    'set_par_end',

  'set_tri_title',    // Trigger settings
    'set_tri_period',
    'set_tri_per_h',
    'set_tri_per_m',
    'set_tri_per_s',
    'set_tri_cond',
    'set_tri_or',
    'set_tri_and',
    'set_tri_is',
    'set_tri_gt',
    'set_tri_ge',
    'set_tri_le',
    'set_tri_lt',
    'set_tri_dly_1',
    'set_tri_dly_2',
    'set_tri_dly_h',
    'set_tri_dly_m',
    'set_tri_dly_s',
    'set_tri_cancel',
    'set_tri_cnt_1',
    'set_tri_cnt_2',
  'set_bt_title',     // Bluetooth settings
    'set_bt_data',
  'set_job_title',    // IoT job settings
    'set_job_name',
    'set_job_ctrl',
    'set_job_on',
    'set_job_off',
  'set_gpio_title',   // GPIO settings
    'set_gpio_pin',
    'set_gpio_mode',
    'set_gpio_mode_d',
    'set_gpio_mode_a',
    'set_gpio_value',
    'set_gpio_intr',
    'set_gpio_intr_p',
    'set_gpio_timer',
    'set_gpio_tim_t',
  'ok',
  'register',
  'cancel',
]

//
// global variables
//

var dragSrcEl = null;     // Drag source element
var targetIndex = 0;      // target job index
var settingTarget = null; // target setting item [jobtype, type, index]
var targetTrig = [];      // target trigger list

//
// global functions
//

// Settings icon click event handler
function handleSetIconClick(e) {
  let item = this.parentElement.parentElement.attributes['name'].nodeValue;
  let items = item.split('/');

  let overlay = document.getElementsByClassName('overlay')[0];
  overlay.classList.add('is-open');

  let settings = document.getElementsByClassName('settings');
  for (let i=0; i<settings.length; i++) {
    settings[i].style.display = (settings[i].id == 'set-' + items[1]) ? 'block' : 'none';
  }

  // set setting target
  settingTarget = items;

  // initialize setting parameters
  switch (items[1]) {
  case 'analog_in': initAnalogInParams(items[2]);   break;
  case 'digital_in':initDigitalInParams(items[2]);  break;

  case 'interval':  initIntervalParams(items[2]);   break;
  case 'ontime':    initOnTimeParams(items[2]);     break;
  case 'part_time': initPartTimeParams(items[2]);   break;
  case 'trigger':   initTriggerParams(items[2]);    break;

  case 'bluetooth': initBluetoothParams(items[2]);  break;
  case 'onoff':     initOnOffParams(items[2]);      break;
  default: break;
  }
}

function onSettingOK() {
  let type = settingTarget[1];
  let idx = settingTarget[2];
  switch (type) {
  case 'analog_in': updateAnalogInParams(idx);  break;
  case 'digital_in':updateDigitalInParams(idx); break;

  case 'interval':  updateIntervalParams(idx);  break;
  case 'ontime':    updateOnTimeParams(idx);    break;
  case 'part_time': updatePartTimeParams(idx);  break;
  case 'trigger':   updateTriggerParams(idx);   break;

  case 'bluetooth': updateBluetoothParams(idx); break;
  case 'onoff':     updateOnOffParams(idx);     break;
  default:
    break;
  }

  hideOverlay();
}
function onSettingCancel() {
  hideOverlay();
}

//
// init/update digital-in parameters
//
function initDigitalInParams(idx) {
  let params = { pin: 1 };
  if (targetJob.sensor[idx].params) {
    params = targetJob.sensor[idx].params;
  }
  document.forms.setting.din_pin.value = params.pin;
}
function updateDigitalInParams(idx) {
  let params = {
    pin: document.forms.setting.din_pin.value
  };
  targetJob.sensor[idx].params = params;

  let elem = document.getElementById('_' + 'digital_in' + idx);
  elem.innerHTML = inspectDigitalIn(targetJob.sensor[idx]);
}

//
// init/update analog-in parameters
//
function initAnalogInParams(idx) {
  let params = { pin: 1 };
  if (targetJob.sensor[idx].params) {
    params = targetJob.sensor[idx].params;
  }
  document.forms.setting.ain_pin.value = params.pin;
}
function updateAnalogInParams(idx) {
  let params = {
    pin: document.forms.setting.ain_pin.value
  };
  targetJob.sensor[idx].params = params;

  let elem = document.getElementById('_' + 'analog_in' + idx);
  elem.innerHTML = inspectAnalogIn(targetJob.sensor[idx]);
}

//
// init/update interval parameters
//
function initIntervalParams(idx) {
  let params = {
    interval_time: 1,
    interval_time_unit: 'hour',
    interval_start: "",
    interval_end: ""
  };
  if (targetJob.timing[idx].params) {
    params = targetJob.timing[idx].params;
  }
  document.forms.setting.interval_time.value      = params.interval_time;
  document.forms.setting.interval_time_unit.value = params.interval_time_unit;
  document.forms.setting.interval_start.value     = params.interval_start;
  document.forms.setting.interval_end.value       = params.interval_end;
}
function updateIntervalParams(idx) {
  let time = Number(document.forms.setting.interval_time.value);
  let unit = document.forms.setting.interval_time_unit.value;
  let start = document.forms.setting.interval_start.value;
  let end = document.forms.setting.interval_end.value;
  // TODO: validate
  let params = {
    interval_time: time,
    interval_time_unit: unit,
    interval_start: start,
    interval_end: end
  };
  targetJob.timing[idx].params = params;

  let elem = document.getElementById('_' + 'interval' + idx);
  elem.innerHTML = inspectInterval(targetJob.timing[idx]);
}

//
// init/update on time parameters
//
function initOnTimeParams(idx) {
  let params = {
    times: []
  };
  if (targetJob.timing[idx].params) {
    params = targetJob.timing[idx].params;
  }
  let times = document.getElementsByName('on_time');
  params.times.forEach(function(time, i) {
    times[i].value = time;
  });
}
function updateOnTimeParams(idx) {
  let params = {
    times: []
  }
  let times = document.getElementsByName('on_time');
  times.forEach(function(time, i) {
    if (time.value !== '') {
      params.times.push(time.value);
    }
  });
  targetJob.timing[idx].params = params;

  let elem = document.getElementById('_' + 'ontime' + idx);
  elem.innerHTML = inspectOnTime(targetJob.timing[idx]);
}

//
// init/update part time parameters
//
function initPartTimeParams(idx) {
  let params = {
    part_start: '9:00',
    part_end: '18:00'
  };
  if (targetJob.timing[idx].params) {
    params = targetJob.timing[idx].params;
  }
  document.forms.setting.part_time_start.value  = params.part_start;
  document.forms.setting.part_time_end.value    = params.part_end;
}
function updatePartTimeParams(idx) {
  let part_start  = document.forms.setting.part_time_start.value;
  let part_end    = document.forms.setting.part_time_end.value;
  let params = {
    part_start: part_start,
    part_end: part_end
  };
  targetJob.timing[idx].params = params;

  let elem = document.getElementById('_' + 'part_time' + idx);
  elem.innerHTML = inspectPartTime(targetJob.timing[idx]);
}

//
// init/update trigger parameters
//
function initTriggerParams(idx) {
  let params = {
    trig_period: 30,
    trig_peri_unit: 'minute',
    triggers: [],
    trig_delay: true,
    trig_delay_time: 30,
    trig_delay_unit: 'minute',
    trig_off: true,
    while_trig_on: true,
    while_trig_time: 1,
    while_trig_unit: 'hour'
  };
  if (targetJob.timing[idx].params) {
    params = targetJob.timing[idx].params;
  }
  targetTrig = params.triggers;

  // init trigger parameters
  let item;
  let sel = document.getElementById('trig_params');
  while(sel.lastChild) {
    sel.removeChild(sel.lastChild);
  }
  targetJob.sensor.forEach(function (sen, i, ary) {
    item = trigParameter[sen.type];
    if (item) {
      let op = document.createElement("option");
      op.value = sen.type;
      op.text = item;
      sel.appendChild(op);
    }
  });
  if (targetJob.sensor.length > 0) {
    changeTriggerParameter(targetJob.sensor[0].type);
  }

  // initialize parameters
  document.forms.setting.trig_period.value = params.trig_period;
  document.forms.setting.trig_peri_unit.value = params.trig_peri_unit;
  document.forms.setting.trigger_on_status.checked = params.trig_delay;
  document.forms.setting.trig_delay_time.value = params.trig_delay_time;
  document.forms.setting.trig_delay_unit.value = params.trig_delay_unit;
  document.forms.setting.trigger_off.checked = params.trig_off;
  document.forms.setting.while_trigger_on.checked = params.while_trig_on;
  document.forms.setting.while_trigger_time.value = params.while_trig_time;
  document.forms.setting.while_trigger_unit.value = params.while_trig_unit;
  let list = document.getElementById('trig_list');
  while (list.length > 0) list.remove(0);
  for (let i = 0; i< params.triggers.length; i++) {
    addTriggerList(params.triggers[i]);
  }
}
function updateTriggerParams(idx) {
  let period = Number(document.forms.setting.trig_period.value);
  let peri_unit = document.forms.setting.trig_peri_unit.value;
  let delay = document.forms.setting.trigger_on_status.checked;
  let delay_time = document.forms.setting.trig_delay_time.value;
  let delay_unit = document.forms.setting.trig_delay_unit.value;
  let trig_off = document.forms.setting.trigger_off.checked;
  let while_on = document.forms.setting.while_trigger_on.checked;
  let while_on_time = document.forms.setting.while_trigger_time.value;
  let while_on_unit = document.forms.setting.while_trigger_unit.value;
  // TODO: validate
  let params = {
    trig_period: period,
    trig_peri_unit: peri_unit,
    triggers: targetTrig,
    trig_delay: delay,
    trig_delay_time: delay_time,
    trig_delay_unit: delay_unit,
    trig_off: trig_off,
    while_trig_on: while_on,
    while_trig_time: while_on_time,
    while_trig_unit: while_on_unit
  };
  targetJob.timing[idx].params = params;
}

//
// init/update bluetooth parameters
//
function initBluetoothParams(idx) {
  let params = {};
  if (targetJob.action[idx].params) {
    params = targetJob.action[idx].params;
  }
  // initialize sensor list
  let list = document.getElementById('set_bt_data_list');
  // clear sensor list
  while (list.rows.length > 1) list.deleteRow(1);
  // add sensors
  targetJob.sensor.forEach(function(sen, idx, ary) {
    let rows = list.insertRow(-1);
    let id = sen.type + '##' + idx;
    let html = '<tr><td><input type="checkbox" id="' + id + '"';
    if (params[sen.type] === undefined) params[sen.type] = true;
    if (params[sen.type]) html += ' checked';
    html += '><label for="' + id + '">';
    html += trigParameter[sen.type];
    if (trigParamUnit[sen.type].length > 0) {
      html += ' [';
      html += trigParamUnit[sen.type];
      html += ']';
    }
    html += '</lable></td></tr>';
    rows.innerHTML = html;
  });
}
function updateBluetoothParams(idx) {
  let params = {};
  let list = document.getElementById('set_bt_data_list');
  for (let i = 1; i < list.rows.length; i++) {
    let check = list.rows[i].cells[0].children[0];
    let type = check.id.split('##')[0];
    params[type] = check.checked;
  }
  targetJob.action[idx].params = params;

  let elem = document.getElementById('_' + 'bluetooth' + idx);
  elem.innerHTML = inspectBluetooth(targetJob.action[idx]);
}

//
// init/update on/off parameters
//
function initOnOffParams(idx) {
  let params = {onoff:1}; // default: ON
  if (targetJob.action[idx].params) {
    params = targetJob.action[idx].params;
  }
  // initialize job list
  let sel = document.getElementById('set_onoff_job_list');
  // clear job list
  while (sel.children.length > 0) {
    sel.removeChild(sel.lastChild);
  }
  // add jobs
  let jobs = getProject().jobList;
  jobs.forEach(function(job, i) {
    let op = document.createElement("option");
    op.value  = job.id;
    op.text   = job.name;
    sel.appendChild(op);
    // restore selected job (if selected)
    if (job.id == params.jobid) {
      sel.selectedIndex = i;
    }
  });
  // initialize job control
  sel = document.getElementById('set_onoff_job_ctrl');
  sel.selectedIndex = params.onoff;
}
function updateOnOffParams(idx) {
  let params = {};
  // get selected job
  let sel = document.getElementById('set_onoff_job_list');
  params.jobid = sel.children[sel.selectedIndex].value;
  // get selected operation (on/off)
  sel = document.getElementById('set_onoff_job_ctrl');
  params.onoff = sel.value;
  // update action parameter
  targetJob.action[idx].params = params;

  let elem = document.getElementById('_' + 'onoff' + idx);
  elem.innerHTML = inspectOnOff(targetJob.action[idx]);
}

function changeTriggerParameter(val) {
  document.getElementById('trig_val_unit').innerText = trigParamUnit[val];
}

// add trigger list
function addTriggerList(trig) {
  let trig_str = '';

  // add to trigger list
  if (trig.and_or) {
    // trig_str += (trig.and_or == 'or' ? 'または' : 'かつ');
    trig_str += andOr[trig.and_or];
    trig_str += ' ';
  }
  trig_str += trigParameter[trig.param];
  if (LANG == LANG_JA) {
    trig_str += ' ' + MSG.set_tri_is;
  }
  trig_str += ' ';
  if (LANG == LANG_EN && (trig.cond == 'gt' || trig.cond == 'lt')) {
    trig_str += trigCondition[trig.cond];
    trig_str += ' ';
    trig_str += trig.value;
    trig_str += trigParamUnit[trig.param];
  }
  else {  // ja
    trig_str += trig.value;
    trig_str += trigParamUnit[trig.param];
    trig_str += ' ';
    trig_str += trigCondition[trig.cond];
  }
  // add trigger to list
  let op = document.createElement("option");
  op.text = trig_str;
  document.getElementById('trig_list').appendChild(op);
  // show and/or
  document.getElementById('and_or').style.display = 'block';
}

// add trigger parameter
function addTrigger() {
  let trig_obj = {};
  // validate parameters
  let trig_val = document.getElementById('trig_value').value;
  document.getElementById('trig_value').value = ''; // clear trigger value
  if (trig_val == '' || isNaN(trig_val)) return;

  // add to trigger list
  if (document.getElementById('trig_list').length > 0) {
    trig_obj.and_or = document.getElementById('and_or').value;
  }
  trig_obj.param = document.getElementById('trig_params').value;
  trig_obj.value = trig_val;
  trig_obj.cond = document.getElementById('trig_cond').value;
  addTriggerList(trig_obj);
  // show and/or
  document.getElementById('and_or').style.display = 'block';
  // add trigger parameter
  targetTrig.push(trig_obj);
}

// detele trigger parameter
function deleteTrigger() {
  let sel = document.getElementById('trig_list');
  let idx = sel.selectedIndex;
  if (idx >= 0) {
    sel.remove(idx);
    targetTrig.splice(idx, 1);
    if (idx == 0 && sel.length > 0) {
      let txt = sel.options[0].text;
      sel.options[0].text = txt.replace(/^(または|かつ|or|and)\s/, '');
      targetTrig[0].and_or = null;
    }
    if (sel.length == 0) {
      // hide and/or
      document.getElementById('and_or').style.display = 'none';
    }
  }
}

function hideOverlay() {
  let overlay = document.getElementsByClassName('overlay');
  overlay[0].classList.remove('is-open');
}

// Delete icon click event handler
function handleDelIconClick(e) {
  let item = this.parentElement.parentElement.attributes['name'].nodeValue;
  let items = item.split('/');
  let targs = document.getElementsByName(items[0] + 's'); /* [jobtype]/xxx/n */

  // TODO: modify bluetooth parameters
  if (items[0] === 'sensor') {
    //
  }

  targetJob[items[0]].splice(items[2], 1);
  // make html
  targs[0].innerHTML = htmlJobItems(targetJob, items[0]);

  // add del_icon handler (refresh)
  let icons = document.getElementsByName("del_icon");
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

// Switch on/off job click handler
function onoffJob() {
  targetJob.onoff = (targetJob.onoff !== 'off') ? 'off' : 'on';
  document.getElementById('jobswi').src = 'img/' + targetJob.onoff + '.png';
}

// update job
function updateJob() {
  // TODO: check target job

  // Count up job number
  if (targetIndex >= jobList.length) {
    let prj = getProject();
    prj.maxJobCount = Number(prj.maxJobCount) + 1;
    setProject(prj);
  }
  // Update job
  setJob(targetIndex, targetJob);

  location.replace(listPage);
}

// onload event handler
window.addEventListener("load", function() {
  /* Get project information from sessionStorage */
  project = getProject();
  jobList = project.jobList;
  targetJob = {id:0, name:"", sensor:[], timing:[], action:[], onoff:'on'};

  /* initialize words */
  document.title = MSG.addjob_title;
  MSGS.forEach(function(id, _idx, _ary) {
    let item = document.getElementById(id);
    if (item) {
      item.innerText = MSG[id];
    }
    else {
      let items = document.getElementsByName(id);
      items.forEach(function(elem, key, parent) {
        elem.innerText = MSG[id];
      });
    }
  })
  
  /* get parameters */
  let params = [];
  let pair = location.search.substring(1).split('&');
  for(let i=0; pair[i]; i++) {
    let kv = pair[i].split('=');
    params[kv[0]] = kv[1];
  }

  /* initialize target job */
  targetIndex = params['index'];
  if (targetIndex < jobList.length) {
    targetJob = JSON.parse(JSON.stringify(jobList[targetIndex])); // deep copy
  }
  else {
    // targetJob.name = 'Job #' + (Number(getProject().maxJobCount) + 1);
    targetJob.id = Number(getProject().maxJobCount) + 1;
    targetJob.name = 'Job #' + targetJob.id;
  }
  document.getElementById('job_name').innerText = targetJob.name;
  document.getElementById('jobswi').src = 'img/' + targetJob.onoff + '.png';

  function handleDragStart(e) {
    this.style.opacity = '0.4';  // this / e.target is the source node.
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('name', this.getAttribute('name'));
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
  }

  function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }

  function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
      // Set the source column's HTML to the HTML of the columnwe dropped on.
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';  // this / e.target is the source node.
    // this/e.target is the source node.
    [].forEach.call(items, function (item) {
      item.classList.remove('over');
    });
  }

  // Add DnD event handler on Sensor/Timing/Action tab
  let items = document.querySelectorAll('.tab_panel .item');
  // alert(items.length);
  [].forEach.call(items, function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });

  // Add jobitem.
  //  name: '[jobtype]/[type]'
  //    jobtype:  sensor / timing / action
  //    type:     sensor: temperature, humidity, ...
  //              timing: interval, ontime, ...
  //              action: bluetooth, gpio, ...
  function addJobItem(name) {
    if (name) {
      let names = name.split('/');
      let item = {type: names[1]};
      item.params = defaultParams[names[1]];
      targetJob[names[0]].push(item);

      // add send datas
      if (names[0] === 'sensor') {
        if (!defaultParams['bluetooth'][names[1]]) {
          defaultParams['bluetooth'][names[1]] = true;
        }
        // update bluetooth parameters
        targetJob.action.forEach(function(act, idx, ary) {
          if (act.type === 'bluetooth') {
            if (act.params[names[1]] === undefined) {
              act.params[names[1]] = true;
            }
            let elem = document.getElementById('_bluetooth' + idx);
            elem.innerHTML = inspectBluetooth(targetJob.action[idx]);
          }
        });
      }

      // Show job items
      showJobItem(targetJob, 0, names[0]);
    }
  }

  function handleItemDrop(e) {
    this.style.opacity = '1';  // this / e.target is the source node.
    addJobItem(e.dataTransfer.getData('name'));
  }

  // Add DnD event handler on target job area
  let jobs = document.getElementsByTagName("fieldset");
  [].forEach.call(jobs, function(job) {
    job.addEventListener('dragenter', handleDragEnter, false);
    job.addEventListener('dragover', handleDragOver, false);
    job.addEventListener('dragleave', handleDragLeave, false);
    job.addEventListener('drop', handleItemDrop, false);
  });

  function handleAddIconClick(e) {
    addJobItem(this.parentElement.attributes['name'].nodeValue);
  }

  let icons = document.getElementsByName("add_icon");
  [].forEach.call(icons, function(icon) {
    icon.addEventListener('click', handleAddIconClick, false);
  })

  icons = document.getElementsByName("del_icon");
  [].forEach.call(icons, function(icon) {
    icon.addEventListener('click', handleDelIconClick, false);
  })

  // Initialize target job
  Object.keys(targetJob).forEach(function(type) {
    showJobItem(this, 0, type);
  }, targetJob);
}, false);

// change job name
function changeJobName() {
  prompt({
    title: 'Plato2',
    label: MSG.inp_jobname,
    value: targetJob.name,
    inputAttrs: { type: 'text', required: true }
  })
  .then((name) => {
    if (name !== null && name !== '') {
      targetJob.name = name;
      document.getElementById('job_name').innerText = name;
    }
  })
  .catch(console.error);
}
