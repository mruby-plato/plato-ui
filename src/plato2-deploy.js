//
//  plato2-deploy.js
//

// constants
MSGS = [
  'deploy_top',
]

// for test
BTDEVS = [
  {"name":'BTDev', "addr":'01:23:45:67:89:AB'},
  {"name":'BTDev', "addr":'12:34:56:78:9A:BC'},
  {"name":'iPhone', "addr":'00:00:00:00:00:00'},
  {"name":'BTBridge', "addr":'FE:DC:BA:98:76:54'},
]

// update BT device list
function updateDeviceList() {
  let table = document.getElementById('bt_dev_list');

  // (for test)
  BTDEVS.forEach(function(dev, idx, _ary) {
    let row = table.insertRow(-1);
    row.insertCell(-1).innerHTML = '<input type="checkbox" id="BTDEV' + idx + '"><label for="BTDEV' + idx + '">' + dev.name + '</label>';
    row.insertCell(-1).innerHTML = '<label for="BTDEV' + idx + '">' + dev.addr + "</label>";
    row.insertCell(-1);
  })
}

// onload event handler
window.addEventListener("load", function() {
  // // initialize words
  // document.title = MSG.deploy_title;
  // MSGS.forEach(funtion(id, _idx, _ary) {
  //   document.getElementById(id).innerText = MSG[id];
  // })

  // initialize BT device list
  updateDeviceList();
}, false);
