
/**
 *
 *
 * @param {*} [properties={ Document, Summary}]
 */
module.exports = function Report(properties = {}) {
  ({
    documents: this.documents,
    summary: this.summary,
  } = properties);
};
