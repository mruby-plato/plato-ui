//
//  plato2-deploy.js
//

// constants
MSGS = [
  'dep_top',
  'dep_dev_list',
  'dep_dev_name',
  'dep_dev_addr',
  'dep_trn_sts',
  'dep_dev_search',
  'dep_edge',
  'dep_bridge',
  'prev',
  'dep_close',
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

// Deploy edge application
function deployEdge() {
  let appRoot = getAppPath();
  let setting = getSetting();
  let writer = getToolPath() + '/mrbwriter/MRBWriter.exe';
  let uuid = setting.bt_setting.grpid.replace(/-/g, '');
  let cmd = writer + ' ' + appRoot + '/' + APPBIN + ' -u' + uuid + ' -s';
  // alert(cmd);

  launchApplication(cmd);
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
}, false);
