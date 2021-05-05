console.log(1)
$('#btn').click(() => {
  console.log('black')
  $.ajax({
    method: "GET", // 一般用 POST 或 GET 方法
    url: "/theme", // 要请求的地址
    data: {
      theme: 'black',
    },
    success(){
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
    success(res){
      // try {
        const {data} = res;
        $('#list').html(data.map(item => `<li>${item.title}</li>`).join(''))
        console.log(data.map(item => `<li>${item.name}</li>`).join(''))
      // } catch (error) {}
    }
  });