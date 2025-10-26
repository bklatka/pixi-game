

import { Application } from "pixi.js";
import "./main.css";


(async () => {
    const domApp = document.querySelector<HTMLDivElement>('#app');
    if (!domApp) {
        alert("No #app div in HTML!");
        return;
    }
    const app = new Application();

    await app.init({ background: "blue", resizeTo: window });

    domApp.appendChild(app.canvas);
})();
