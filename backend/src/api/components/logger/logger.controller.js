const fs = require('fs-extra');
const formidable = require('formidable');

const LoggerService = require('./logger.service');

module.exports = function LoggerController() {
  
  const UPLOAD_DIR = `${process.cwd()}/tmp`;
  
  this.processLogFile = async (req, res) => {
    // clean up /tmp dir
    fs.emptyDirSync(UPLOAD_DIR);

    let { file } = await parseFilesFromFormUpload(req);
    file = await renameFileToOriginalName(file);
    const report = await LoggerService.generateReport(file);

    res.json(report);
  };

  async function parseFilesFromFormUpload(request) {
    return new Promise((resolve, reject) => {
      const form = formidable({
        uploadDir: UPLOAD_DIR,
        keepExtensions: true,
      });
    
      form.parse(request, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    });
  }
  
  async function renameFileToOriginalName(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file has been sent!'));
      }
  
      fs.rename(file.path, `${UPLOAD_DIR}/${file.name}`, err => {
        if (err) {
          reject(err);
        }
  
        file.path = `${UPLOAD_DIR}/${file.name}`;
        resolve(file);
      });
    });
  }

  return this;
}();

