/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");

module.exports = function(content) {
  this.cacheable && this.cacheable();
  if(!this.emitFile) throw new Error("emitFile is required from module system");

  var query = loaderUtils.parseQuery(this.query);
  var config = this.options['exFileLoader'] || {}

  var url = loaderUtils.interpolateName(this, query.name || "[hash].[ext]", {
    context: query.context || this.options.context,
    content: content,
    regExp: query.regExp
  });

  var emitUrl = url;

  if(config['emitUrl'] && typeof(config['emitUrl']) === 'function' ) {
    emitUrl = config['emitUrl'](url);
  }

  var refUrl = url;

  if(config['refUrl'] && typeof(config['refUrl']) === 'function' ) {
    refUrl = config['refUrl'](url);
    console.log(refUrl);
  }

  this.emitFile(emitUrl, content);
  return "module.exports = __webpack_public_path__ + " + JSON.stringify(refUrl) + ";";
}
module.exports.raw = true;
