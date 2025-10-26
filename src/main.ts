

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

    globalThis.__PIXI_APP__ = app;
    await Player.preload();
    await app.init({ background: "#f3cead", resizeTo: window });

    const keyboard = new KeyboardController(app);


    const player = new Player(app);
    player.add();


    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;


    app.stage.addListener("pointerdown", () => {
        player.mainAction();
    })

    app.ticker.add(() => {
        player.setupControls(keyboard);
    })



    domApp.appendChild(app.canvas);
})();

