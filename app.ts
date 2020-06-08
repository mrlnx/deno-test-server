import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import {
    getDogs, 
    getDog,
    addDog,
    updateDog,
    removeDog,
} from './routes.ts';


const env = Deno.env.toObject();

const PORT = env.PORT || 4000
const HOST = env.HOST || '127.0.0.1'

const router = new Router();

router
.get('/dogs', getDogs)
.get('/dog/:name', getDog)
.post('/dogs', addDog)
.put('/dogs/:name', updateDog)
.delete('/dogs/:name', removeDog);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);