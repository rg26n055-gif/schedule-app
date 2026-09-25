// Local-only fixture server. Production files on disk and Firebase are never modified.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req,res) => {
  const pathname = new URL(req.url,'http://local').pathname;
  const isFixture = pathname.startsWith('/fixture/');
  const name = isFixture ? pathname.slice('/fixture'.length) : pathname;
  const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
  if (!file.startsWith(root + path.sep)) { res.statusCode=403; return res.end(); }
  try {
    let text = fs.readFileSync(isFixture && name === '/firebase.js' ? path.join(__dirname,'firebase-mock.js') : file,'utf8');
    if (isFixture) {
      text = text.replace(/https:\/\/www.gstatic.com\/firebasejs\/12.19.0\/firebase-(auth|firestore).js/g,'/fixture/firebase.js');
      if (file.endsWith('.html')) text = text.replace('<head>', '<head><script>window.fixture=parent.testFixture; window.confirm=()=>parent.confirmDelete; window.matchMedia ||= (()=>({matches:false}));</script>');
    }
    res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'text/html');
    res.end(text);
  } catch { res.statusCode=404; res.end('Not found'); }
});
server.listen(Number(process.env.PORT || 8765),'127.0.0.1',()=>console.log('Local test server ready'));
