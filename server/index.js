const res = require('dotenv').config({ path: '../config/.env.dev' });

if (res.error) {
    throw res.error;
}

const fastify = require('fastify')({
    logger: true
});

fastify.register(require('fastify-cors'), { 
    origin: "*",
});
const PORT = 1337;

 
fastify.get('/', async() => {
    return {
        Test: 'This is working fine'
    };
});

fastify.post('/recipe', async(req, res) => {
    console.log(req.body);
    return {
        Test: 'This is working fine'
    };
});
 
const serve = async () => {
    try {
        await fastify.listen(PORT);
        fastify.log.info(`Server listening to PORT ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
serve();