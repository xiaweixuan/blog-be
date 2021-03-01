const { Script } = require('../models');
const path = require('path');
const { uploadFile, deleteFile } = require('../util/file');
const uploadDir = path.join(__dirname, '../../resourceStatic/script/');

class ScriptController {
  async getScripts(ctx) {
    try {
      const result = await Script.findAll();
      ctx.body = { success: true, data: result };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async createScript(ctx) {
    try {
      const { synopsis } = ctx.request.body;
      const file = ctx.request.files.file;
      if (!file.type.match(/javascript/)) {
        ctx.body = { success: false, error: '请添加正确格式的脚本' };
        ctx.status = 400;
        return;
      }
      const res = uploadFile(file, uploadDir);
      if (!res.hasOwnProperty('filePath')) {
        ctx.body = { success: false, error: '上传文件错误' };
        ctx.status = 500;
        return;
      }
      const { length } = await Script.findAll();
      const script = await Script.create({
        id: length + 1,
        synopsis,
        script_path: `/script/${res.saveName}`,
        save_path: res.savePath,
        save_name: res.saveName,
      });
      ctx.body = { success: true, data: script };
      ctx.status = 201;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async updateScript(ctx) {
    try {
      const { script_id } = ctx.params;
      const { synopsis } = ctx.request.body;
      const script = await Script.findByPk(script_id);
      if (!script) {
        throw new global.errs.NotFound('没有找到相关脚本');
      }
      await script.update({
        synopsis,
      });
      ctx.body = { success: true, data: script };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async removeScript(ctx) {
    try {
      const { script_id } = ctx.params;
      const script = await Script.findByPk(script_id);
      if (!script) {
        throw new global.errs.NotFound('没有找到相关脚本');
      }
      deleteFile(script.save_path, script.save_name);
      await script.destroy()
      ctx.body = { success: true, id: Number(script_id) };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }
}

module.exports = ScriptController;
