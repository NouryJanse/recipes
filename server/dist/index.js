"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const res = require('dotenv').config({ path: '../config/.env.dev' });
const fastify = require('fastify')({
    logger: true,
});
const recipePrint = (title) => {
    const recipe = {
        id: 0,
        title,
    };
    return recipe;
};
const recipe = recipePrint('test');
if (res.error) {
    throw res.error;
}
const test = {};
fastify.register(require('fastify-cors'), {
    origin: "*",
});
fastify.get('/', () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        Test: 'This is working fine'
    };
}));
fastify.post('/recipe', (req) => __awaiter(void 0, void 0, void 0, function* () {
    return Object.assign(Object.assign({}, req.body), { test, modified_at: Date.now() });
    // return reply.code(201).send({
    //   ...req.body,
    //   test,
    //   modified_at: Date.now(),
    // })
}));
const serve = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fastify.listen(process.env.PORT);
        fastify.log.info(`Server listening to PORT ${fastify.server.address().port}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
serve();
