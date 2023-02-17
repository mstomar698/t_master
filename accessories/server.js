import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  if (req.url === '/tscript.sh') {
    const fileStream = fs.createReadStream('./script.sh');
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
