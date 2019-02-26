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

// onload event handler
window.addEventListener("load", function() {
  // initialize BT device list
  updateDeviceList();
}, false);
