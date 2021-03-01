const { Photo } = require('../models');
const path = require('path');
const { uploadFile, deleteFile } = require('../util/file');
const uploadDir = path.join(__dirname, '../../resourceStatic/photo/');

class PhotoController {
  async getPhotos(ctx) {
    try {
      const { type } = ctx.query;
      if (type) {
        const result = await Photo.findAll({ type });
        ctx.body = { success: true, data: result };
        ctx.status = 200;
        return;
      }
      const result = await Photo.findAll();
      ctx.body = { success: true, data: result };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async createPhoto(ctx) {
    try {
      const { synopsis, type } = ctx.request.body;
      const file = ctx.request.files.file;
      if (!type) {
        ctx.body = { success: false, error: '请加入type字段' };
        ctx.status = 400;
        return;
      }
      if (!file.type.match(/image/)) {
        ctx.body = { success: false, error: '请添加正确格式的图片' };
        ctx.status = 400;
        return;
      }
      const res = uploadFile(file, uploadDir);
      if (!res.hasOwnProperty('filePath')) {
        ctx.body = { success: false, error: '上传文件错误' };
        ctx.status = 500;
        return;
      }
      const { length } = await Photo.findAll();
      const photo = await Photo.create({
        id: length + 1,
        synopsis,
        img_path: `/photo/${res.saveName}`,
        save_path: res.savePath,
        save_name: res.saveName,
        type,
      });
      ctx.body = { success: true, data: photo };
      ctx.status = 201;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async updatePhoto(ctx) {
    try {
      const { photo_id } = ctx.params;
      const { synopsis } = ctx.request.body;
      const photo = await Photo.findByPk(photo_id);
      if (!photo) {
        throw new global.errs.NotFound('没有找到相关图片');
      }
      await photo.update({
        synopsis,
      });
      ctx.body = { success: true, data: photo };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async removePhoto(ctx) {
    try {
      const { photo_id } = ctx.params;
      const photo = await Photo.findByPk(photo_id);
      if (!photo) {
        throw new global.errs.NotFound('没有找到相关图片');
      }
      deleteFile(photo.save_path, photo.save_name);
      await photo.destroy()
      ctx.body = { success: true, id: Number(photo_id) };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }
}

module.exports = PhotoController;
