

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
    player.setupControls(keyboard);

    app.ticker.add(() => {
        if (keyboard.isKeyPressed("W")) {
            player.setVector("y", -1);
        } else if (keyboard.isKeyPressed("S")) {
            player.setVector("y", 1);
        } else {
            player.setVector("y", 0);
        }

        if (keyboard.isKeyPressed("D")) {
            player.setVector("x", 1);
        } else if (keyboard.isKeyPressed("A")) {
            player.setVector("x", -1);
        } else {
            player.setVector("x", 0)
        }
    })



    domApp.appendChild(app.canvas);
})();

