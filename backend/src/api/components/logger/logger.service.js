const fs = require('fs');
const Log = require('./log.model');
const Document = require('./document.model');
const LOG_LEVEL = require('./log-level.constant');

module.exports = function LoggerService() {

  const documents = new Map();
  const threads = new Map();
  const uidDocumentMap = new Map();

  this.generateReport = async (fileInfo) => {
    try {
      documents.clear();
      threads.clear();
      uidDocumentMap.clear();

      const rawFile = await readFile(fileInfo);
      processLog(rawFile);
      return documents;
    } catch (error) {
      console.error(`Something went wrong when trying to reading the file!`);
    }
  };

  async function readFile(fileInfo) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileInfo.path, (err, rawFileDataBuffer) => {
        if (err) {
          reject(err);
        }
        resolve(rawFileDataBuffer.toString());
      });
    });
  }

  function processLog(rawFile) {
    const breakLineRegex = /\r\n|\r|\n/;
    const regexLogSeparator = /(\S*\s\S*)\s+\[(\S*)\]\s+(\S*)\s+\[(\S*)\]:\s+(.*)/i;

    rawFile.split(breakLineRegex).forEach(line => {
      // If this is the first line of the log
      if (regexLogSeparator.test(line)) {
        const log = new Log({
          timestamp: RegExp.$1,
          thread: RegExp.$2,
          level: RegExp.$3,
          senderClass: RegExp.$4,
          message: RegExp.$5
        });

        // I'm reducing the logfile array that we must check
        // Because all informations needed at the moment will be retrieved
        // from the INFO log level
        if (log.level === LOG_LEVEL.INFO) {
          organizeReport(log);
        }
      }
    });
  }

  function organizeReport(log) {

    const startReadingData = getStartReadingLogData(log);
    if (startReadingData) {
      const documentAlreadyTracked = documents.has(startReadingData.id);
      const document = documentAlreadyTracked ?
        documents.get(startReadingData.id) :
        new Document(startReadingData);

      document.startRenderingList.push(startReadingData.timestamp);

      // Add to the pool of threads to be watched
      threads.set(startReadingData.thread, startReadingData.id);
      // Set the new version of the document to the map
      documents.set(startReadingData.id, document);
      return;
    }

    const uidLogData = getUniqueIdLogData(log, threads);
    if (uidLogData) {
      const document = documents.get(uidLogData.id);
      document.uid = uidLogData.uid;
      documents.set(uidLogData.id, document);
      threads.delete(log.thread);
      uidDocumentMap.set(document.uid, uidLogData.id);
      return;
    }

    const renderingLogData = getRenderingLogData(log);
    if (renderingLogData) {
      const documentId = uidDocumentMap.get(renderingLogData.uid);
      const document = documents.get(documentId);
      // We must check it because in the begining of file we can't
      // relate to the document
      if (document) {
        document.getRenderingList.push(renderingLogData.timestamp);
        documents.set(`${document.id}${document.page}`, document);
      }
    }
  };

  function getStartReadingLogData(log) {
    if (log.senderClass === 'ServerSession' &&
      log.message.match('name=startRendering')) {

      const argumentRegex = /\[(.+[^\]])\]/;
      argumentRegex.test(log.message);
      const [documentId, page] = RegExp.$1.trim().replace(' ', '').split(',');
      
      return {
        id: `${documentId}${page}`,
        timestamp: log.timestamp,
        thread: log.thread,
        documentId,
        page,
      };
    }
  }

  function getUniqueIdLogData(log, threads) {
    if (threads.has(log.thread) &&
      log.senderClass === 'ServiceProvider' &&
      log.message.match('Service startRendering returned')
    ) {
      const uidRegex = /(\d+.\d+)/;
      uidRegex.test(log.message);
      return {
        id: threads.get(log.thread),
        uid: RegExp.$1,
      };
    }
  }

  function getRenderingLogData(log) {
    if (
      log.senderClass === 'ServerSession' &&
      log.message.match('name=getRendering')) {
      const argumentRegex = /\[(.+[^\]])\]/;
      argumentRegex.test(log.message);
      return {
        uid: RegExp.$1,
        timestamp: log.timestamp,
      };
    }
  }

  return this;
}();
