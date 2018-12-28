if (LANG == LANG_EN) {
  // common
  MSG.prev          = 'Prev.';
  MSG.next          = 'Next';
  MSG.ok            = 'OK';
  MSG.cancel        = 'Cancel';
  MSG.browse        = 'Browse...';
  MSG.save_setting  = 'Save settings';
  MSG.register      = 'Register';
  MSG.none          = 'none';
  MSG.on            = 'ON';
  MSG.off           = 'OFF';

  // units
  MSG.hour          = 'hours';
  MSG.minute        = 'minutes';
  MSG.second        = 'seconds';

  // plato2.html
  MSG.new_app       = 'Create application';
  MSG.open_app      = 'Open application';
  MSG.open_app_file = '"Open `${project.name}`"';
  MSG.open_app_err  = 'Failed to read the application file.';

  // plato2-main.html
  MSG.main_title    = 'Plato2 - Create new application';
  MSG.main_top      = 'Enter basic information for an application';
  MSG.app_name      = 'Application name:';
  MSG.grp_setting   = 'Group setting:';
  MSG.new_grpset    = 'New group setting...';
  MSG.sel_grpset    = '-- Select group setting --';
  MSG.open_set_err  = 'Failed to read the group setting file.';

  // plato2-network.html
  MSG.group_title   = 'Plato2 - Group settings';
  MSG.bt_setting    = 'Bluetooth settings';
  MSG.bt_id         = 'Group ID:';
  MSG.bt_dev_id     = 'Device ID:';
  MSG.bt_dev_cnt    = 'Number of devices:';
  MSG.lora_setting  = 'LoRaWAN settings';
  MSG.user_eui      = 'Set DevEUI, AppEUI and AppKey';
  MSG.save_confirm  = 'Register the group setting.';
  // MSG.overwrite_confirm = '`Overwrite the group setting "${setting.name}."`';
  MSG.default       = 'Default';

  // plato2-joblist.html
  MSG.list_title    = 'Plato2 - List of IoT jobs';
  MSG.list_top      = 'List of IoT jobs.';

  // plato2-addjob.html
  MSG.addjob_title  = 'Plato2 - Edit IoT job';
  MSG.addjob_top    = 'Select sensors, timings and actions';
  MSG.tab_sensor    = 'Sensors';
  MSG.tab_timing    = 'Timings';
  MSG.tab_action    = 'Actions';
  MSG.sen_temp      = 'Temperature';
  MSG.sen_humi      = 'Humidity';
  MSG.sen_pres      = 'Air-press.';
  MSG.sen_loca      = 'Location';
  MSG.sen_velo      = 'Velocity';
  MSG.sen_angl      = 'Angle';
  MSG.sen_batt      = 'Battery level';
  MSG.sen_din       = 'Digital-in';
  MSG.sen_ain       = 'Analog-in';
  MSG.tim_intr      = 'Interval';
  MSG.tim_time      = 'on time';
  MSG.tim_part      = 'part time';
  MSG.tim_trig      = 'Trigger';
  MSG.act_bt        = 'Bluetooth';
  MSG.act_swi       = 'On/Off';
  MSG.act_gpio      = 'GPIO output';
  MSG.set_ain_title = 'Analog input settings';
  MSG.set_ain_pin   = 'Analog pin:';
  MSG.set_din_title = 'Digital input settings';
  MSG.set_din_pin   = 'Digital pin:';
  MSG.inp_jobname   = 'Input IoT job name.';

  MSG.set_int_title   = 'Interval settings';
  MSG.set_int_period  = 'Interval period:';
  MSG.set_int_per_h   = 'hours';
  MSG.set_int_per_m   = 'minutes';
  MSG.set_int_per_s   = 'seconds';
  MSG.set_int_start   = 'Start time:';
  MSG.set_int_end     = 'End time:';

  MSG.set_tim_title = 'Time specification settings';
  MSG.set_tim_time  = 'Time to action:';
  MSG.set_tim_none  = 'Not specified';

  MSG.set_par_title = 'Part time settings';
  MSG.set_par_start = 'Start Time:';
  MSG.set_par_end   = 'End time:';

  MSG.set_tri_title   = 'Trigger settings';
  MSG.set_tri_none    = 'No trigger';
  MSG.set_tri_period  = 'Trigger determination period:';
  MSG.set_tri_per_h   = 'hours';
  MSG.set_tri_per_m   = 'minutes';
  MSG.set_tri_per_s   = 'seconds';
  MSG.set_tri_cond    = 'Trigger condition:';
  MSG.set_tri_or      = 'OR';
  MSG.set_tri_and     = 'AND';
  MSG.set_tri_is      = 'is';
  MSG.set_tri_gt      = 'larger than';
  MSG.set_tri_ge      = 'or more';
  MSG.set_tri_le      = 'or less';
  MSG.set_tri_lt      = 'less than';
  MSG.set_tri_dly_1   = 'If the condition satisfying the condition continues for';
  MSG.set_tri_dly_2   = ', it is assumed that the trigger condition is satisfied.';
  MSG.set_tri_dly_h   = 'hours';
  MSG.set_tri_dly_m   = 'minutes';
  MSG.set_tri_dly_s   = 'seconds';
  MSG.set_tri_cancel  = 'Cancel the trigger when the condition is not satisfied.';
  MSG.set_tri_cnt_1   = 'If the trigger condition continues to be established, repeat the action every';
  MSG.set_tri_cnt_2   = '.';

  MSG.set_bt_title  = 'Bluetooth settings';
  MSG.set_bt_data   = 'Send data:';

  MSG.set_job_title   = 'IoT job control settings';
  MSG.set_job_on      = 'Turn on';
  MSG.set_job_off     = 'Turn off';
  MSG.set_job_name    = 'Job:';
  MSG.set_job_ctrl    = 'On/Off:';
  MSG.set_job_notsel  = 'Not selected';

  MSG.set_gpio_title  = 'GPIO settings';
  MSG.set_gpio_pin    = 'Port:';
  MSG.set_gpio_mode   = 'Output mode:';
  MSG.set_gpio_mode_d = 'Digital';
  MSG.set_gpio_mode_a = 'Analog';
  MSG.set_gpio_value  = 'Output value:';
  MSG.set_gpio_intr   = 'Repeat HIGH / LOW at constant intervals';
  MSG.set_gpio_intr_p = 'HIGH / LOW period:';
  MSG.set_gpio_timer  = 'Output stops after a certain time has elapsed';
  MSG.set_gpio_tim_t  = 'Time to stop:';

  MSG.set_confirm     = 'Register the IoT job.';

  // plato2-confirm.html
  MSG.confirm_title   = 'Plato2 - Create an application';
  MSG.confirm_top     = 'Create an application with the following contents.';
  MSG.confirm_create  = 'Create';
  MSG.conf_app_device = 'Application for edge device';
  MSG.conf_app_bridge = 'Application for Bluetooth-LoRaWAN bridge';
  MSG.conf_done       = 'Application generated.';

  // trigger parameters
  trigParameter['temperature']   = 'temperature';
  trigParameter['humidity']      = 'humidity';
  trigParameter['air_pressure']  = 'air pressure';
  trigParameter['vibration']     = 'count of vibration';
  trigParameter['angle']         = 'angle';
  trigParameter['distance']      = 'distance';
  trigParameter['velocity']      = 'velocity';
  trigParameter['battery']       = 'battery power';
  trigParameter['analog_in']     = 'analog value';
  trigParameter['digital_in']    = 'digital value';
  // trigger parameter unit
  trigParamUnit['temperature']  = '℃';
  trigParamUnit['humidity']     = '%';
  trigParamUnit['air_pressure'] = 'hPa';
  trigParamUnit['vibration']    = 'times';
  trigParamUnit['angle']        = 'dig.';
  trigParamUnit['distance']     = 'km';
  trigParamUnit['velocity']     = 'km/h';
  trigParamUnit['battery']      = '%';
  trigParamUnit['analog_in']    = '';
  trigParamUnit['digital_in']   = '';
  // trigger conditions
  trigCondition['gt'] = 'larger than';
  trigCondition['ge'] = 'or more';
  trigCondition['le'] = 'or less';
  trigCondition['lt'] = 'less than';
  trigCondition['eq'] = 'equal';
  // and/or
  andOr['and']  = 'AND';
  andOr['or']   = 'OR';

  // get message string
  function getMessage(id, param) {
    switch (id) {
    case 'open_app_file':     return `open '${param}'`;
    case 'overwrite_confirm': return `Update the group setting "${param}".`;
    case 'del_job_confirm':   return `Confirm delete job "${param}".`;
    }
  }

  // // Inspect digital_in setting
  // function inspectDigitalIn(item, tab=SP, lf=BR, ind=0) {
  //   return tabs(ind, tab) + 'Digital in' + lf
  //     + tabs(ind + 1, tab) + 'Digital PIN: ' + item.params.pin + lf;
  // }

  // // Inspect analog_in setting
  // function inspectAnalogIn(item, tab=SP, lf=BR, ind=0) {
  //   return tabs(ind, tab) + 'Analog in' + lf
  //     + tabs(ind + 1, tab) + 'Analog PIN: ' + item.params.pin + lf;
  // }

  // Inspect trigger setting
  function inspectTrigger(item, tab=SP, lf=BR, ind=0) {
    var str = tabs(ind, tab) + MSG.set_tri_title + lf;
    if (item.params.triggers.length == 0) {
      str += tabs(ind + 1, tab) + MSG.set_tri_none + lf;
      return str;
    }
    str += tabs(ind + 1, tab) + 'Period: ' + item.params.trig_period + ' ' + item.params.trig_peri_unit + lf;
    str += tabs(ind + 1, tab) + MSG.set_tri_cond + lf;
    item.params.triggers.forEach(function(trig, i) {
      str += tabs(ind + 2, tab);
      if (i > 0) str += andOr[trig.and_or] + ' ';
      str += trigParameter[trig.param] + ' ';
      str += trigCondition[trig.cond] + ' ' + trig.value + trigParamUnit[trig.param] + lf;
    })
    if (item.params.trig_delay)
      str += tabs(ind + 1, tab) + 'Dealy: ' + item.params.trig_delay_time + item.params.trig_delay_unit + lf;
    str += tabs(ind + 1, tab) + 'Cancel: ' + item.params.trig_off + lf;
    if (item.params.while_trig_on)
      str += tabs(ind + 1, tab) + 'Interval: ' + item.params.while_trig_time + item.params.while_trig_unit + lf;
    return str;
  }

  // // Inspect Bluetooth setting
  // function inspectBluetooth(item) {
  //   var cnt = 0;
  //   var str = 'Bluetooth settings' + BR
  //     + SP + SP + 'Send data:' + BR;
  //   for (key in item.params) {
  //     if (item.params[key]) {
  //       str += SP + SP + SP + SP + trigParameter[key] + BR;
  //       cnt++;
  //     }
  //   }
  //   if (cnt == 0) {
  //     str += SP + SP + SP + SP + 'none';
  //   }
  //   return str;
  // }
}
