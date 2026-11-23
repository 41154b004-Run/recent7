// recent7.js：照 rules.md 寫的版本
// 輸入：records＝一串紀錄，每筆像 { log_date: '2026-11-23', minutes: 30 }（minutes 可能是 null）
//       today＝今天的日期，例如 '2026-11-23'
// 輸出：{ minutes: 總共幾分鐘, count: 幾筆 }
// 格式說明在 README.md；要怎麼算看 rules.md。

function recent7(records, today) {
  // 規則 5：若傳入紀錄清單為空陣列或無資料，回傳 { minutes: 0, count: 0 }
  if (!Array.isArray(records) || records.length === 0) {
    return { minutes: 0, count: 0 };
  }

  // 規則 1：計算範圍包含今天（today）與往前回推 6 天（含今天共 7 天）
  var todayDate = new Date(today + 'T00:00:00Z');
  var startDateObj = new Date(today + 'T00:00:00Z');
  startDateObj.setUTCDate(todayDate.getUTCDate() - 6);
  var startDate = startDateObj.toISOString().slice(0, 10);

  var totalMinutes = 0;
  var totalCount = 0;

  for (var i = 0; i < records.length; i++) {
    var rec = records[i];
    if (!rec || !rec.log_date) {
      continue;
    }

    var logDate = rec.log_date;

    // 規則 4：早於計算範圍第 1 天以前的紀錄，以及晚於今天（未來的日期）的紀錄，均不計入
    if (logDate < startDate || logDate > today) {
      continue;
    }

    // 規則 2：在範圍內的每一筆紀錄都要計入筆數（count 加 1），同一天有多筆紀錄時每筆分開計數
    totalCount++;

    // 規則 3：紀錄的 minutes 為有效數字時累加至總分鐘數；若 minutes 為 null，分鐘數不累加（視為 0 分鐘）
    if (typeof rec.minutes === 'number' && !isNaN(rec.minutes)) {
      totalMinutes += rec.minutes;
    }
  }

  return {
    minutes: totalMinutes,
    count: totalCount
  };
}
