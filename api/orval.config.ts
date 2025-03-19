import { defineConfig } from 'orval';

export default defineConfig({
  'api-client': {
    input: './openapi/document.yaml',
    output: {
      client: 'fetch',
      target: './orval/generated/client.ts',
      mode: 'split',
      baseUrl: 'http://dummy.example.com',
      override: {
        mutator: {
          path: './orval/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
  },
  zod: {
    input: './openapi/document.yaml',
    output: {
      client: 'zod',
      target: './orval/generated/client.zod.ts',
      mode: 'single',
      override: {
        zod: {
          generate: {
            param: false,
            body: true,
            response: false,
            query: true,
            header: false,
          },
          coerce: {
            body: true,
            query: true,
          },
        },
      },
    },
  },
});
