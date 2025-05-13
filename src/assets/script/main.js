// main.js
import { handleRouting } from './router.js';

window.addEventListener("hashchange", handleRouting);
window.addEventListener("load", handleRouting);