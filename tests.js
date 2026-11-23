// tests.js：測試都寫在這個檔。一條測試呼叫一次 addCase，格式見 README.md。
// 照 rules.md 寫，名字開頭標「規則 N」。

// 規則 1：計算範圍包含今天（today）與往前回推 6 天（含今天共 7 天）
addCase({
  name: '規則 1：剛好在今天（今天算第 1 天）',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 }
  ],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 1：剛好在 7 天範圍的最早一天（今天往前推第 6 天，含今天共 7 天）',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-17', minutes: 40 }
  ],
  expect: { minutes: 40, count: 1 }
});

// 規則 2：在範圍內的每一筆紀錄都要計入筆數（count 加 1），同一天有多筆紀錄時每筆分開計數
addCase({
  name: '規則 2：同一天有多筆紀錄，每筆分開計數與累加分鐘',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-20', minutes: 25 },
    { log_date: '2026-11-20', minutes: 35 }
  ],
  expect: { minutes: 60, count: 2 }
});

addCase({
  name: '規則 2：不同天各有多筆紀錄，全部皆計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-18', minutes: 20 },
    { log_date: '2026-11-19', minutes: 15 },
    { log_date: '2026-11-23', minutes: 10 }
  ],
  expect: { minutes: 45, count: 3 }
});

// 規則 3：紀錄的 minutes 為有效數字時累加至總分鐘數；若 minutes 為 null，分鐘數不累加，但仍計入 1 筆筆記
addCase({
  name: '規則 3：紀錄的 minutes 為 null 時，count 加 1，分鐘數不增加',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-21', minutes: null }
  ],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 3：混合有效分鐘數與 null 紀錄，筆數皆算但只累加有效分鐘',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-22', minutes: 50 },
    { log_date: '2026-11-22', minutes: null }
  ],
  expect: { minutes: 50, count: 2 }
});

addCase({
  name: '規則 3：紀錄的 minutes 為 0 時，count 加 1 且總分鐘加 0',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 0 }
  ],
  expect: { minutes: 0, count: 1 }
});

// 規則 4：早於計算範圍第 1 天以前的紀錄，以及晚於今天（未來的日期）的紀錄，均不計入筆數與分鐘數
addCase({
  name: '規則 4：早於 7 天範圍的紀錄（8 天前，例如 2026-11-16）不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-16', minutes: 60 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 4：晚於今天的紀錄（未來日期，例如 2026-11-24）不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-24', minutes: 60 }
  ],
  expect: { minutes: 0, count: 0 }
});

// 規則 5：若傳入的紀錄清單為空陣列或無任何範圍內紀錄，回傳 { minutes: 0, count: 0 }
addCase({
  name: '規則 5：傳入空紀錄陣列，回傳 0 分鐘與 0 筆',
  today: '2026-11-23',
  records: [],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 5：所有紀錄皆在範圍外，回傳 0 分鐘與 0 筆',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-10', minutes: 40 },
    { log_date: '2026-11-30', minutes: 50 }
  ],
  expect: { minutes: 0, count: 0 }
});
