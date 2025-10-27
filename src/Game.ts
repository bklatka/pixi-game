import { Application } from "pixi.js";
import { Bullets } from "./models/player/guns/Bullets.ts";
import { Player } from "./models/player/Player.ts";
import { KeyboardController } from "./KeyboardController.ts";
import { GameUI } from "./UI/GameUI.ts";


export class Game {

    public app: Application;
    public bullets: Bullets;
    public player: Player;
    public keyboard: KeyboardController;
    public ui: GameUI;

    public constructor() {
        this.app = new Application();
    }

    public async preload() {
        await Player.preload();
    }

    public async init() {
        // @ts-ignore - add debug tools
        globalThis.__PIXI_APP__ = this.app;

        await this.app.init({ background: "#f3cead", resizeTo: window });
        this.keyboard = new KeyboardController();
        this.bullets = new Bullets(this);
        this.player = new Player(this);
        this.ui = new GameUI(this);

        this.player.add();

        this.listenToPointerDown();
    }

    private listenToPointerDown() {
        const { app, player } = this;
        app.stage.eventMode = "static";
        app.stage.hitArea = app.screen;

        app.stage.addListener("pointerdown", () => {
            player.mainAction();
        })
    }

    public dispose() {
        this.bullets.dispose();
        this.player.dispose();
        this.keyboard.dispose();
        this.app.destroy();
    }
}