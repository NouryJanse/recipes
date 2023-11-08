// // This file contains code that we reuse between our tests.
// import Fastify, { FastifyInstance } from 'fastify'
// import fp from 'fastify-plugin'
// import App from '../app'

// const domain = process.env.AUTH0_DOMAIN ? process.env.AUTH_DOMAIN : ''

// // Fill in this config with all the configurations
// // needed for testing the application
// async function config(): Promise<{ domain: string | undefined }> {
//   return {
//     domain,
//   }
// }

// // Automatically build and tear down our instance
// function build(): FastifyInstance {
//   const app = Fastify()

//   // fastify-plugin ensures that all decorators
//   // are exposed for testing purposes, this is
//   // different from the production setup

//   beforeAll(async () => {
//     app.register(fp(App), await config())
//     await app.ready()
//   })

//   afterAll(() => app.close())

//   return app
// }

// export { config, build }
