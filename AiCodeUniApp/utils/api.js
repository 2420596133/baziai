import { get, post } from "./request";

// 八字排盘 API（后端路径：/api/BaZi/paiPan）
export const api = {
  bazi: {
    // 公历转八字排盘 GET /api/BaZi/paiPan?year=&month=&day=&hour=&isMale=
    calculate: (data) =>
      get("/api/BaZi/paiPan", {
        year: data.year,
        month: data.month,
        day: data.day,
        hour: data.hour,
        isMale: data.isMale,
      }),
  },

  // 铁板神数（路径待确认）
  tieban: {
    calculate: (data) => post("/api/TiebanShenshu/calculate", data),
  },
};

// 获取设备指纹（用于心跳/在线统计）
export function getVisitorId() {
  return new Promise((resolve) => {
    const key = "zeri_visitor_id";
    let vid = uni.getStorageSync(key);
    if (vid) return resolve(vid);

    const info = {
      ua: "weapp",
      plat: uni.getSystemInfoSync().platform,
      t: Date.now(),
    };
    vid = "vid_" + Math.abs(hashCode(JSON.stringify(info))).toString(16);
    uni.setStorageSync(key, vid);
    resolve(vid);
  });
}

function hashCode(s) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
