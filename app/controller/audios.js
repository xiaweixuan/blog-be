const { Audio } = require('../models');
const path = require('path');
const { uploadFile, deleteFile } = require('../util/file');
const uploadDir = path.join(__dirname, '../../resourceStatic/audio/');

class AudioController {
  async getAudios(ctx) { 
    try {
      const result = await Audio.findAll();
      ctx.body = { success: true, data: result };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async createAudio(ctx) {
    try {
      const { synopsis, title } = ctx.request.body;
      const file = ctx.request.files.file;
      if (!file.type.match(/audio/)) {
        ctx.body = { success: false, error: '请添加正确格式的音频' };
        ctx.status = 400;
        return;
      }
      const res = uploadFile(file, uploadDir);
      if (!res.hasOwnProperty('filePath')) {
        ctx.body = { success: false, error: '上传文件错误' };
        ctx.status = 500;
        return;
      }
      const audio = await Audio.create({
        synopsis,
        title,
        audio_path: `${process.env.SERVE_URL}/audio/${res.saveName}`,
        save_path: res.savePath,
        save_name: res.saveName,
      });
      ctx.body = { success: true, data: audio };
      ctx.status = 201;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async updateAudio(ctx) { 
    try {
      const { audio_id } = ctx.params;
      const { synopsis, title } = ctx.request.body;
      const audio = await Audio.findByPk(audio_id);
      if (!audio) {
        throw new global.errs.NotFound('没有找到相关音频');
      }
      await audio.update({
        synopsis,
        title,
      });
      ctx.body = { success: true, data: audio };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async removeAudio(ctx) { 
    try {
      const { audio_id } = ctx.params;
      const audio = await Audio.findByPk(audio_id);
      if (!audio) {
        throw new global.errs.NotFound('没有找到相关音频');
      }
      deleteFile(audio.save_path, audio.save_name);
      await audio.destroy()
      ctx.body = { success: true, id: Number(audio_id) };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }
}

module.exports = AudioController;
