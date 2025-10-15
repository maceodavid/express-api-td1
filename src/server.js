import http from 'http';

const PORT = process.env.POST || 3000;

const server = http.createServer((req, res) => {
  res.end('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
