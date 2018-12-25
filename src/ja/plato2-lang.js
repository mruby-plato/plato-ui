if (LANG == LANG_JA) {
  // common
  MSG.prev          = '前へ';
  MSG.next          = '次へ';
  MSG.ok            = 'OK';
  MSG.cancel        = 'キャンセル';
  MSG.browse        = '参照...';
  MSG.save_setting  = '設定保存';
  MSG.register      = '登録';
  MSG.none          = 'なし';

  // plato2.html
  MSG.new_app       = '新規アプリケーションの作成';
  MSG.open_app      = '既存アプリケーションの読み込み';
  MSG.open_app_file = '`${project.name} を開く`';
  MSG.open_app_err  = 'アプリケーションファイルの読み込みに失敗しました。';

  // plato2-main.html
  MSG.main_title    = 'Plato2 - 新規アプリケーションの作成';
  MSG.main_top      = 'アプリケーションの基本情報を入力してください';
  MSG.app_name      = 'アプリケーション名:';
  MSG.grp_setting   = 'グループ設定:';
  MSG.new_grpset    = '新規グループ設定...';
  MSG.sel_grpset    = '-- 選択して下さい --';
  MSG.open_set_err  = 'グループ設定ファイルの読み込みに失敗しました。';

  // plato2-network.html
  MSG.group_title   = 'Plato2 - グループ設定';
  MSG.bt_setting    = 'Bluetooth端末設定';
  MSG.bt_id         = '識別ID:';
  MSG.bt_dev_id     = '端末ID:';
  MSG.bt_dev_cnt    = '端末数:';
  MSG.lora_setting  = 'LoRaWAN設定';
  MSG.user_eui      = 'DevEUI / AppEUI / AppKey を設定する';
  MSG.save_confirm  = 'グループ設定を登録します。';
  // MSG.overwrite_confirm = '`グループ設定 ${setting.name} を上書きします。`';
  MSG.default       = 'デフォルト';

  // plato2-joblist.html
  MSG.list_title    = 'Plato2 - IoTジョブ一覧';
  MSG.list_top      = 'IoTジョブ一覧';

  // plato2-addjob.html
  MSG.addjob_title  = 'Plato2 - IoTジョブ登録';
  MSG.addjob_top    = 'センサ・タイミング・アクションを選択して下さい';
  MSG.tab_sensor    = 'センサ';
  MSG.tab_timing    = 'タイミング';
  MSG.tab_action    = 'アクション';
  MSG.sen_temp      = '温度';
  MSG.sen_humi      = '湿度';
  MSG.sen_pres      = '気圧';
  MSG.sen_loca      = 'GPS(位置情報)';
  MSG.sen_velo      = 'GPS(移動情報)';
  MSG.sen_angl      = '角度';
  MSG.sen_batt      = 'バッテリレベル';
  MSG.sen_din       = 'ディジタル入力';
  MSG.sen_ain       = 'アナログ入力';
  MSG.tim_intr      = '周期指定';
  MSG.tim_time      = '時刻指定';
  MSG.tim_part      = '時間帯指定';
  MSG.tim_trig      = 'トリガ指定';
  MSG.act_bt        = 'Bluetooth送信';
  MSG.act_swi       = 'ON/OFF制御';
  MSG.act_gpio      = 'GPIO出力';
  MSG.set_ain_title = 'アナログ入力設定';
  MSG.set_ain_pin   = 'アナログPIN:';
  MSG.set_din_title = 'ディジタル入力設定';
  MSG.set_din_pin   = 'ディジタルPIN:';
  MSG.inp_jobname   = 'ジョブ名を入力して下さい。';

  MSG.set_int_title   = '周期指定';
  MSG.set_int_period  = '周期:';
  MSG.set_int_per_h   = '時間毎';
  MSG.set_int_per_m   = '分毎';
  MSG.set_int_per_s   = '秒毎';
  MSG.set_int_start   = '開始時刻:';
  MSG.set_int_end     = '終了時刻:';

  MSG.set_tim_title = '時刻指定';
  MSG.set_tim_time  = '動作時刻';

  MSG.set_par_title = '時間帯指定';
  MSG.set_par_start = '開始時刻:';
  MSG.set_par_end   = '終了時刻:';

  MSG.set_tri_title   = 'トリガ指定';
  MSG.set_tri_period  = 'トリガ判定周期:';
  MSG.set_tri_per_h   = '時間毎';
  MSG.set_tri_per_m   = '分毎';
  MSG.set_tri_per_s   = '秒毎';
  MSG.set_tri_cond    = 'トリガ条件:';
  MSG.set_tri_or      = 'または';
  MSG.set_tri_and     = 'かつ';
  MSG.set_tri_is      = 'が';
  MSG.set_tri_gt      = 'より大きい';
  MSG.set_tri_ge      = '以上';
  MSG.set_tri_le      = '以下';
  MSG.set_tri_lt      = 'より小さい';
  MSG.set_tri_dly_1   = '条件を満たした状態が';
  MSG.set_tri_dly_2   = '継続すればトリガ条件成立とみなす';
  MSG.set_tri_dly_h   = '時間';
  MSG.set_tri_dly_m   = '分';
  MSG.set_tri_dly_s   = '秒';
  MSG.set_tri_cancel  = '条件不成立となった場合にトリガを取り消す';
  MSG.set_tri_cnt_1   = 'トリガ条件の成立が継続している場合に';
  MSG.set_tri_cnt_2   = 'に繰り返す';

  MSG.set_bt_title  = 'Bluetooth設定';
  MSG.set_bt_data   = '送信データ:';

  MSG.set_job_title = 'IoTジョブ制御設定';
  MSG.set_job_start = '開始する';
  MSG.set_job_stop  = '停止する';

  MSG.set_gpio_title  = 'GPIO制御設定';
  MSG.set_gpio_pin    = 'PIN番号:';
  MSG.set_gpio_mode   = '出力モード:';
  MSG.set_gpio_mode_d = 'ディジタル';
  MSG.set_gpio_mode_a = 'アナログ';
  MSG.set_gpio_value  = '出力値:';
  MSG.set_gpio_intr   = '一定周期でHIGH/LOWを繰り返す';
  MSG.set_gpio_intr_p = 'HIGH/LOWの周期:';
  MSG.set_gpio_timer  = '一定時間経過すると出力を停止する';
  MSG.set_gpio_tim_t  = '停止までの時間:';

  MSG.set_confirm     = 'ジョブを登録します。';

  // plato2-confirm.html
  MSG.confirm_title   = 'Plato2 - アプリケーション作成';
  MSG.confirm_top     = '以下の内容でアプリケーションを作成します';
  MSG.confirm_create  = 'アプリ生成';
  MSG.conf_app_device = '端末アプリケーション';
  MSG.conf_app_bridge = 'Bluetooth-LoRaWANブリッジアプリケーション';
  MSG.conf_done       = 'アプリケーションを生成しました。';

  // trigger parameters
  trigParameter['temperature']  = '温度';
  trigParameter['humidity']     = '湿度';
  trigParameter['air_pressure'] = '気圧';
  trigParameter['vibration']    = '振動回数';
  trigParameter['angle']        = '傾斜角度';
  trigParameter['distance']     = '移動距離';
  trigParameter['velocity']     = '速度';
  trigParameter['battery']      = '電池残量';
  trigParameter['analog_in']    = 'アナログ値';
  trigParameter['digital_in']   = 'ディジタル値';
  // trigger parameter unit
  trigParamUnit['temperature']  = '℃';
  trigParamUnit['humidity']     = '%';
  trigParamUnit['air_pressure'] = 'hPa';
  trigParamUnit['vibration']    = '回';
  trigParamUnit['angle']        = '度';
  trigParamUnit['distance']     = 'km';
  trigParamUnit['velocity']     = 'km/h';
  trigParamUnit['battery']      = '%';
  trigParamUnit['analog_in']    = '';
  trigParamUnit['digital_in']   = '';
  // trigger conditions
  trigCondition['gt'] = 'より大きい';
  trigCondition['ge'] = '以上';
  trigCondition['le'] = '以下';
  trigCondition['lt'] = 'より小さい';
  trigCondition['eq'] = 'と等しい';
  // and/or
  andOr['and']  = 'かつ';
  andOr['or']   = 'または';

  // get message string
  function getMessage(id, param) {
    switch (id) {
    case 'open_app_file': return `'${param}' を開く`;
    case 'overwrite_confirm': return `グループ設定 "${param}" を更新します。`;
    }
  }

  // // Inspect digital_in setting
  // function inspectDigitalIn(item, tab=SP, lf=BR, ind=0) {
  //   return tabs(ind, tab) + 'ディジタル入力' + lf
  //     + tabs(ind + 1, tab) + 'ディジタルPIN: ' + item.params.pin + lf;
  // }

  // // Inspect analog_in setting
  // function inspectAnalogIn(item, tab=SP, lf=BR, ind=0) {
  //   return tabs(ind, tab) + 'アナログ入力' + lf
  //     + tabs(ind + 1, tab) + 'アナログPIN: ' + item.params.pin + lf;
  // }

  // Inspect trigger setting
  function inspectTrigger(item, tab=SP, lf=BR, ind=0) {
    var str = tabs(ind, tab) + MSG.set_tri_title + lf
      + tabs(ind + 1, tab) + '判定周期: ' + item.params.trig_period + ' ' + item.params.trig_peri_unit + lf;
    str += tabs(ind + 1, tab) + MSG.set_tri_cond + lf;
    item.params.triggers.forEach(function(trig, i) {
      str += tabs(ind + 2, tab);
      if (i > 0) str += andOr[trig.and_or] + ' ';
      str += trigParameter[trig.param] + ' ' + MSG.set_tri_is + ' ';
      str += trig.value + trigParamUnit[trig.param] + ' ' + trigCondition[trig.cond] + lf;
    })
    if (item.params.trig_delay)
      str += tabs(ind + 1, tab) + '遅延判定: ' + item.params.trig_delay_time + item.params.trig_delay_unit + lf;
    str += tabs(ind + 1, tab) + '取消: ' + item.params.trig_off + lf;
    if (item.params.while_trig_on)
      str += tabs(ind + 1, tab) + '継続間隔: ' + item.params.while_trig_time + item.params.while_trig_unit + lf;
    return str;
  }

  // // Inspect Bluetooth setting
  // function inspectBluetooth(item) {
  //   var cnt = 0;
  //   var str = 'Bluetooth送信設定' + BR
  //     + SP + SP + '送信データ:' + BR;
  //   for (key in item.params) {
  //     if (item.params[key]) {
  //       str += SP + SP + SP + SP + trigParameter[key] + BR;
  //       cnt++;
  //     }
  //   }
  //   if (cnt == 0) {
  //     str += SP + SP + SP + SP + 'なし';
  //   }
  //   return str;
  // }
}
