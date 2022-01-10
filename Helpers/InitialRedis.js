import { createClient } from "redis";

const client = createClient({
    port: 6379,
    host: '127.0.0.1',
});

(async () => {
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    console.log(`Redis is listening on PORT 6379`);
})();


export default client;