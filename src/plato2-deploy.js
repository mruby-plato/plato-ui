//
//  plato2-deploy.js
//

// constants
MSGS = [
  'dep_top',
  'dep_path',
  'dep_dev_list',
  'dep_dev_name',
  'dep_dev_addr',
  'dep_trn_sts',
  'dep_dev_search',
  'dep_edge',
  'dep_bridge',
  'dep_copy',
  'prev',
  'close',
]

// add Bluetooth device to device list
//  dev:    device information
//    .name   device name
//    .addr   Bluetooth device address
function addBTDevice(dev) {
  let table = document.getElementById('bt_dev_list');
  let row = table.insertRow(-1);
  let idx = row.rowIndex;
  row.insertCell(-1).innerHTML = '<input type="checkbox" id="BTDEV' + idx + '"><label for="BTDEV' + idx + '">' + dev.name + '</label>';
  row.insertCell(-1).innerHTML = '<label for="BTDEV' + idx + '">' + dev.addr + "</label>";
  row.insertCell(-1);
}

// update BT device list
function updateDeviceList() {
  /* Clear device list */
  let table = document.getElementById('bt_dev_list');
  while(table.rows[0]) table.deleteRow(0);

  /* launch `mrbwrite list` */
  let cmd = getToolPath() + '/mrbwrite list 3000';
  launchApplication(cmd, function(error, stdout, stderr) {
    if (stdout !== null) {
      devs = stdout.split(/\n/);
      devs.forEach(line => {
        dev = line.split(':');  /* [0]:addr, [1]:name */
        /* format device address */
        if (dev.length >= 2) {
          addrs = [];
          for (hex=dev[0]; hex; hex=hex.substr(2)) {
            addrs.push(hex.substr(0, 2));
          }
          /* Add device list */
          addBTDevice({name: dev[1], addr: addrs.join(':')});
        }
      });
    }
    console.log('stderr: ' + (stderr||'none'));
    if (error !== null) console.log('exec error: '+error);
  });
}

// // Scan Bluetooth device
// var ble = new BlueJelly();
// const uuid_data_service = "24620200-1f7e-4adb-936a-ba3687e99b18";

// function scanDevice() {
//   mainWindow.webContents.on('selext-bluetooth-device', (event, deviceList, callback) => {
//     event.preventDefault();
//     console.log('Device list:', deviceList);
//     let result = deviceList[0];
//     if (!result) {
//       callback('');
//     }
//     else {
//       callback(result.deviceId);
//     }
//   });

//   ble.setUUID("DataService", uuid_data_service, '');
//   ble.scan("DataService");
//   // launchApplication('open file:///Users/mimaki/git/mimaki/wk/bluehelly/bj-plato.html');
// }

// Deploy edge application
function deployEdge() {
  // let appRoot = getAppPath();
  // let setting = getSetting();
  // let writer = getToolPath() + '/mrbwriter/MRBWriter.exe';
  // let uuid = setting.bt_setting.grpid.replace(/-/g, '');

  // var devid = parseInt(setting.bt_setting.devid, 16);
  // var devcnt = setting.bt_setting.devcnt;
  // var bins = '';
  // for (var dev=0; dev<devcnt; dev++) {
  //   bins += (appRoot + '/bin/' + 'edge_' + ('00000' + (devid + dev).toString(16)).slice(-6).toUpperCase() + '.bin ');
  // }
  // let cmd = writer + ' ' + bins + '-u' + uuid + ' -s';
  let writer = getToolPath() + '/plato-web.html';
  var cmd = '';
  switch (getOS()) {
    case OS_MAC:
      cmd = 'open /Applications/Google\\ Chrome.app';
      break;
    case OS_WINDOWS:
      cmd = '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"';
      break;
    default:
      break;
  }
  cmd += ' ' + writer;
  // alert(cmd);

  launchApplication(cmd);
}

// Deploy bridge application
function deployBridge() {
  let appRoot = getAppPath();
  let writer = getToolPath() + '/mrbwriter/MRBWriter.exe';

  bin = appRoot + '/bin/bridge.bin';
  let cmd = writer + ' ' + bin + ' -s -b';
  // alert(cmd);

  launchApplication(cmd);
}

// Copy application path to clipboard
function copyAppPath() {
  var copyTarget = document.getElementById("app_path");
  copyTarget.select();
  document.execCommand("Copy");
  alert("アプリケーションパスをコピーしました");
}

// onload event handler
window.addEventListener("load", function() {
  /* initialize words */
  document.title = MSG.dep_title;
  MSGS.forEach(function(id, _idx, _ary) {
    document.getElementById(id).innerText = MSG[id];
  })

  // /* initialize BT device list */
  // updateDeviceList();

  // initialize application path
  document.getElementById("app_path").value = getAppPath() + '/bin';
}, false);
