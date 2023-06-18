import os from 'os';
import { App } from './app.js';

const app = new App(os.homedir(), process.argv.slice(2));

app.greet();
process.on('exit', () => app.bye());
await app.start();
