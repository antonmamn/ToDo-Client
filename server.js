// server.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  // Use Vite's middlewares
  app.use(vite.middlewares);

  // Handle all routes with SSR logic
  app.use('/', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Read and transform the HTML template
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);

      // Load the server entry and render the app
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const appHtml = await render(url);

      // Inject the rendered HTML into the template
      const html = template.replace('<!--ssr-outlet-->', appHtml);

      // Send the rendered HTML
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5431, () => {
    console.log('Development server is running at http://localhost:5431');
  });
}

createServer();
