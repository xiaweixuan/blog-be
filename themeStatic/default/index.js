$('#btn').click(() => {
  $.ajax({
    method: "GET", // 一般用 POST 或 GET 方法
    url: "/theme", // 要请求的地址
    data: {
      theme: 'black',
    },
    success() {
      location.reload();
    }
  });
})
$.ajax({
  method: "GET", // 一般用 POST 或 GET 方法
  url: "/api/articles", // 要请求的地址
  data: {
    theme: 'black',
  },
  success(res) {
    try {
      const {
        data
      } = res;
      $('#list').html(data.map(item => `<li>${item.title}</li>`).join(''))
    } catch (error) {}
  }
});
$.ajax({
  method: "GET", // 一般用 POST 或 GET 方法
  url: "/api/themelist", // 要请求的地址
  success(res) {
    try {
      const {
        data
      } = res;
      $('#list').html(data.map(item => `<li>${item.title}</li>`).join(''))
    } catch (error) {}
  }
});