module.exports = function Document(properties = {}) {
  ({
    documentId: this.id,
    getRenderingList: this.getRenderingList = [],
    page: this.page,
    startRenderingList: this.startRenderingList = [],
  } = properties);
};
