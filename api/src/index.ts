import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';

import { createApp, handleError } from '@/app';
import posts from '@/routes/posts';

const app = createApp();

app.use(logger());

app.onError(handleError);

app.route('/api/posts', posts);

if (process.env.NODE_ENV === 'development') {
  const openapiConfig = {
    openapi: '3.0.0',
    info: {
      version: '0.1.0',
      title: 'Prototype API',
    },
  };

  app.doc('/openapi/doc', openapiConfig);
  app.get('/openapi/ui', swaggerUI({ url: '/openapi/doc' }));
}

serve(
  {
    fetch: app.fetch,
    port: 3030,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Swagger UI is running on http://localhost:${info.port}/openapi/ui`,
      );
    }
  },
);
