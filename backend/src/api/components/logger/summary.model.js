module.exports = function Report(properties = {}) {
  ({
    totalOfRenderings: this.totalOfRenderings,
    duplicateRedering: this.duplicateRedering,
    renderingWithoutGet: this.renderingWithoutGet,
  } = properties);
};
