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
  'save_setting',
]

// enable LoRaWAN settings (DevEUI/AppEUI/AppKey)
function enableLoRaParams(checked) {
  document.getElementById('deveui').disabled = !checked;
  document.getElementById('appeui').disabled = !checked;
  document.getElementById('appkey').disabled = !checked;
}

// show Bluetooth decvice IDs
function showDeviceID() {
  var sid = document.getElementById('start_deviceid');  // start decvice ID
  var eid = document.getElementById('end_deviceid');    // end device ID
  var num = document.getElementById('device_count');    // number of device

  inputHex(sid);

  if (sid.value.length > 0) {
    document.getElementById('start_deviceid').value = sid.value.toUpperCase();
    var hex = (parseInt(sid.value, 16) + Number(num.value) - 1).toString(16).toUpperCase();
    if (hex.length > 6) hex = hex.slice(-6);
    eid.value = hex;
  }
  else {
    eid.value = '';
  }
}

// update job
function updateSetting() {
  // TODO: check settings

  setting.name = document.getElementById('grpname').selectedOptions[0].text;

  /* Bluetooth settings */
  setting.bt_setting.grpid  = document.getElementById('proximity').value;
  setting.bt_setting.devid  = document.getElementById('start_deviceid').value;
  setting.bt_setting.devcnt = document.getElementById('device_count').value;
  /* LoRaWAN settings */
  setting.lora_setting.custom = document.getElementById('custom_eui').checked;
  setting.lora_setting.deveui = document.getElementById('deveui').value;
  setting.lora_setting.appeui = document.getElementById('appeui').value;
  setting.lora_setting.appkey = document.getElementById('appkey').value;

  // Update setting
  setSetting(setting);

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
