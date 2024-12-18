import { createProxyMiddleware } from 'http-proxy-middleware';

export function startProxyServer(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://tomscodeapp.netlify.app',
      changeOrigin: true,
    })
  );
}