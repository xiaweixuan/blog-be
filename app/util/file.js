const fs = require('fs');
const path = require('path');


/**
 * 读取文件方法
 * @param  {string} 文件本地的绝对路径
 * @return {string|binary} 
 */
function file(filePath) {
  let content = fs.readFileSync(filePath, 'binary')
  return content
}

function uploadFile(file, uploadDir) {
  try {
    if (!file.name) return {};
    const randomNum = new Date().getTime();

    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = uploadDir + `${randomNum}_${file.name}`;

    // 创建可写流
    const upStream = fs.createWriteStream(filePath);

    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return {
      fileName: file.name,
      saveName: `${randomNum}_${file.name}`,
      filePath: filePath.replace(new RegExp(/(\\)/, "g"), '\\/'),
      savePath: uploadDir,
    }
  } catch (error) {
    return {}
  }
}

function deleteFile(url, name) {
  let succ = false;
  if (fs.existsSync(url)) {    // 判断给定的路径是否存在
    const files = fs.readdirSync(url);    // 返回文件和子目录的数组
    files.forEach((file) => {
      const curPath = path.join(url, file);
      if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
        deleteFile(curPath, name);
      } else {
        if (file.indexOf(name) > -1) {    //是指定文件，则删除
          fs.unlinkSync(curPath);
          succ = true;
        }
      }
    });
    if (succ) return true;
    return false;
  } else {
    return false;
  }
}

module.exports = { file, uploadFile, deleteFile }