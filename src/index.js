import app from './app.js'
import { PORT } from './config.js';

app.listen(PORT);
console.log("escuchando en el puerto", PORT);
