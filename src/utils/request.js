// 封装通用接口调用模块
const request = function(path, method = "GET", data) {
  let url = "https://www.zhengzhicheng.cn/api/public/v1/" + path;
  return new Promise((resolve, reject) => {
    mpvue.request({
      url: url,
      method: method,
      data: data,
      success(res) {
        resolve(res);
        mpvue.hideLoading();
      },
      complete(res) {
        // console.log(res);
      }
    });
  });
};
// 导出
export default request;
