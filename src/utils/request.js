// 封装通用接口调用模块
const request = function(path) {
  let url = "https://www.zhengzhicheng.cn/api/public/v1/" + path;
  return new Promise((resolve, reject) => {
    mpvue.request({
      url: url,
      success(res) {
        resolve(res);
      }
    });
  });
};
// 导出
export default request;
