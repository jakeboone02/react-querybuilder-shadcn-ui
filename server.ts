import indexHtml from './index.html';

const port = process.env.PORT || 3000;

const server = Bun.serve({
  port,
  static: { '/': indexHtml },
  fetch: async () => new Response('Page not found', { status: 404 }),
});

console.log(`Listening on ${server.url}`);
