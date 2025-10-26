

import { Application } from "pixi.js";
import "./main.css";
import { Player } from "./models/player/Player.ts";
import { KeyboardController } from "./KeyboardController.ts";


(async () => {
    const domApp = document.querySelector<HTMLDivElement>('#app');
    if (!domApp) {
        alert("No #app div in HTML!");
        return;
    }
    const app = new Application();

    await Player.preload();
    await app.init({ background: "#42f1ff", resizeTo: window });

    const keyboard = new KeyboardController(app);


    const player = new Player(app);
    player.add();


    app.ticker.add(() => {
        player.setupControls(keyboard);
    })



    domApp.appendChild(app.canvas);
})();

