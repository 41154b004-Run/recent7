// recent7-quick.js：對照用。只用一句話請 AI 寫的版本放這裡。
// 函式名稱一樣叫 recent7，輸入、輸出的格式跟 recent7.js 一樣（見 README.md）。

function recent7(records, today) {
  if (!Array.isArray(records)) {
    return { minutes: 0, count: 0 };
  }

  // 計算今天往前回推 6 天（含今天共 7 天）的日期字串
  var d = new Date(today + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() - 6);
  var startDate = d.toISOString().slice(0, 10);

  var totalMinutes = 0;
  var totalCount = 0;

  for (var i = 0; i < records.length; i++) {
    var rec = records[i];
    if (!rec || !rec.log_date) {
      continue;
    }

    if (rec.log_date >= startDate && rec.log_date <= today) {
      totalCount++;
      if (typeof rec.minutes === 'number' && !isNaN(rec.minutes)) {
        totalMinutes += rec.minutes;
      }
    }
  }

  return {
    minutes: totalMinutes,
    count: totalCount
  };
}

