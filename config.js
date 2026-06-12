// Decodes obfuscated env values (XOR + base64). Not encryption — keeps keys out of plain text in env.js.
(function () {
  var SALT = 'portfolio-web3forms-v1';

  window.decodeEnvKey = function (encoded) {
    if (!encoded) return '';
    var raw = atob(encoded);
    var salt = new TextEncoder().encode(SALT);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) {
      out[i] = raw.charCodeAt(i) ^ salt[i % salt.length];
    }
    return new TextDecoder().decode(out);
  };
})();
