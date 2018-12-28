// constants
MSGS = [
  'grp_setting',
  'bt_setting',
  'bt_id',
  'bt_dev_id',
  'bt_dev_cnt',
  'lora_setting',
  'user_eui',
  'cancel',
  // 'save_setting',
]

// enable LoRaWAN settings (DevEUI/AppEUI/AppKey)
function enableLoRaParams(checked) {
  document.getElementById('deveui').disabled = !checked;
  document.getElementById('appeui').disabled = !checked;
  document.getElementById('appkey').disabled = !checked;
}

// show Bluetooth decvice IDs
function showDeviceID() {
  let sid = document.getElementById('start_deviceid');  // start decvice ID
  let eid = document.getElementById('end_deviceid');    // end device ID
  let num = document.getElementById('device_count');    // number of device

  inputHex(sid);

  if (sid.value.length > 0) {
    document.getElementById('start_deviceid').value = sid.value.toUpperCase();
    eid.value = getEndDevId(sid.value, Number(num.value));
  }
  else {
    eid.value = '';
  }
}

// update setting from UI
function getSettingFromUI() {
  let setting = getSetting();

  // TODO: check settings

  /* Group setting name */
  setting.name                = document.getElementById('grpname').value;
  /* Bluetooth settings */
  setting.bt_setting.grpid    = document.getElementById('proximity').value;
  setting.bt_setting.devid    = document.getElementById('start_deviceid').value;
  setting.bt_setting.devcnt   = document.getElementById('device_count').value;
  /* LoRaWAN settings */
  setting.lora_setting.custom = document.getElementById('custom_eui').checked;
  setting.lora_setting.deveui = document.getElementById('deveui').value;
  setting.lora_setting.appeui = document.getElementById('appeui').value;
  setting.lora_setting.appkey = document.getElementById('appkey').value;

  return setting;
}

// update job
function updateSetting() {
  // update setting from UI
  let setting = getSettingFromUI();

  // check update
  if (JSON.stringify(setting) !== JSON.stringify(getSetting())) {
    let setting_name = getSettingPath() + '/' + setting.name + '.json';
    if (isFileExist(setting_name)) {
      if (!window.confirm(getMessage('overwrite_confirm', setting.name))) return;
    }
    else {
      if (!window.confirm(MSG.save_confirm)) return;
    }

    // save group setting
    saveFile(setting_name, JSON.stringify(setting));

    // Update setting
    setSetting(setting);
  }

  // return to main page
  location.replace(mainPage);
}

// onload event handler
window.addEventListener("load", function() {
  /* initialize words */
  document.title = MSG.group_title;
  MSGS.forEach(function(id, _idx, _ary) {
    document.getElementById(id).innerText = MSG[id];
  })

  /* set values */
  setting = getSetting();
  /* Group setting name */
  document.getElementById('grpname').value = setting.name;
  /* Bluetooth settings */
  document.getElementById('proximity').value = setting.bt_setting.grpid;
  document.getElementById('start_deviceid').value = setting.bt_setting.devid;
  document.getElementById('device_count').value = setting.bt_setting.devcnt;
  showDeviceID();
  /* LoRaWAN settings */
  document.getElementById('custom_eui').checked = setting.lora_setting.custom;
  enableLoRaParams(setting.lora_setting.custom);
  document.getElementById('deveui').value = setting.lora_setting.deveui;
  document.getElementById('appeui').value = setting.lora_setting.appeui;
  document.getElementById('appkey').value = setting.lora_setting.appkey;
}, false);
