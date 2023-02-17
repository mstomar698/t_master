import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  if (req.url === '/tscript.sh') {
    const fileStream = fs.createReadStream('./tscript.sh');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    fileStream.pipe(res);
  } else if (req.url === '/nscript.sh') {
    const fileStream = fs.createReadStream('./nscript.sh');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    fileStream.pipe(res);
  } else if (req.url === '/gscript.sh') {
    const fileStream = fs.createReadStream('./gscript.sh');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    fileStream.pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
