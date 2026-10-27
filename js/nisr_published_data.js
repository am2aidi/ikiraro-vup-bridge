/*
 * Values transcribed from NISR's EICV7 VUP Thematic Report (2025), tables
 * 4.2, 4.5, 4.8 and 4.11. These describe timeliness of the latest reported
 * payment. They are percentages, not mean delay days.
 */
(function (root) {
  const reportUrl = "https://microdata.statistics.gov.rw/index.php/catalog/121/download/1095";
  const published = {
    title: "EICV7 VUP Thematic Report (2025)",
    sourceUrl: reportUrl,
    timeliness: [
      { programme: "Direct Support", onTime: 15.1, days1to10: 56.2, days11to20: 22.4, over20: 6.4, table: "Table 4.2", page: 34 },
      { programme: "Classic Public Works", onTime: 9.6, days1to10: 59.1, days11to20: 18.5, over20: 12.8, table: "Table 4.5", page: 37 },
      { programme: "Expanded Public Works", onTime: 7.2, days1to10: 46.4, days11to20: 28.7, over20: 17.7, table: "Table 4.8", page: 40 },
      { programme: "Nutrition-Sensitive Direct Support", onTime: 17.4, days1to10: 47.9, days11to20: 21.4, over20: 13.3, table: "Table 4.11", page: 42 }
    ]
  };
  root.NISR_PUBLISHED_DATA = published;
  if (typeof module !== "undefined") module.exports = published;
})(typeof window !== "undefined" ? window : globalThis);
