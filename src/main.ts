import "./main.css";
import { Game } from "./Game.ts";


(async () => {
    const domApp = document.querySelector<HTMLDivElement>('#app');
    if (!domApp) {
        alert("No #app div in HTML!");
        return;
    }
    const game = new Game();
    await game.preload();
    await game.init();

    domApp.appendChild(game.app.canvas);
})();

