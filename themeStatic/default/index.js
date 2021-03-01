console.log(1)
$('#btn').click(() => {
  console.log("");
  $.ajax({
    method: "GET", // 一般用 POST 或 GET 方法
    url: "/api/v1/1", // 要请求的地址
    data: {
      theme: 'black',
    },
    success(){
      location.reload();
    }
  });
})