import { type Application, Assets, Sprite, Ticker } from "pixi.js";
import idlePlayer from "./assets/idle.png";
import type { KeyboardController } from "../../KeyboardController.ts";

export class Player {
    private player: Sprite;

    private speed: number = 0.2;

    private vector = {
        x: 0,
        y: 0,
    }

    private ticker?: Ticker;

    public static async preload() {
        await Assets.load({
            alias: "player-idle",
            src: idlePlayer,
        });
    }

    public constructor(private app: Application) {
        this.player = Sprite.from("player-idle");

        app.ticker.add((ticker) => {
            this.ticker = ticker
            this.render(ticker);
        })
    }

    public add() {
        this.app.stage.addChild(this.player);


        this.player.anchor.set(0.5, 0.5)
        this.player.x = this.app.screen.width / 2;
        this.player.y = this.app.screen.height / 2;
        this.player.scale = 1;
    }

    public setVector(dimension: "x" | "y", addValue: number) {
        this.vector[dimension] = addValue;
    }

    public render(ticker: Ticker) {
        this.move(ticker);
    }

    public setupControls(keyboard: KeyboardController) {


    }

    private move(ticker: Ticker) {
        const deltaTime = ticker.deltaMS;
        this.player.x += this.vector.x * this.speed * deltaTime;
        this.player.y += this.vector.y * this.speed * deltaTime;
    }

    public async dispose() {
        this.ticker?.destroy();
    }
}