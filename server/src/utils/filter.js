// constants/salary.js
const salaryRange = {
  "1": { min: 0, max: 10000000 },         // Dưới 10 triệu
  "2": { min: 10000000, max: 15000000 },  // 10 - 15 triệu
  "3": { min: 15000000, max: 20000000 },  // 15 - 20 triệu
  "4": { min: 20000000, max: 30000000 },  // 20 - 30 triệu
  "5": { min: 30000000, max: null },      // Trên 30 triệu, không giới hạn max
};

export {
    salaryRange
}