// 后端 API 基础地址
const BASE_URL = "https://m9nmksd3.zjz-service.cn/zeri";

// 请求封装
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else if (res.statusCode === 401 || res.statusCode === 403) {
          // 访问被禁 / 未登录
          if (res.statusCode === 403 && res.header["X-Zeri-Banned"]) {
            uni.showModal({
              title: "访问受限",
              content: "访问异常，请联系管理员",
              showCancel: false,
            });
          } else {
            uni.showToast({ title: "登录已过期", icon: "none" });
          }
          reject(new Error(res.statusCode === 403 ? "Banned" : "Unauthorized"));
        } else {
          reject(new Error(res.data?.msg || "请求失败"));
        }
      },
      fail(err) {
        reject(new Error(err.errMsg || "网络错误"));
      },
    });
  });
}

// 快捷方法
export const get = (url, data) => request(url, { data });
export const post = (url, data) =>
  request(url, { method: "POST", data });
export const getJson = (url) => request(url);

export default request;
