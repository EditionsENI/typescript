import fastify from 'fastify';

const server = fastify();

server.get('/employee', async (req, res) => {
    return {
        firstName: "Evelyn",
        lastName: "Miller"
    };
});

server.listen({ port: 3000}, (err, address) => {
    if(err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server listening at ${address}`);
});