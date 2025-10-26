import { type Application, Assets, Graphics, Sprite, Ticker } from "pixi.js";
import idlePlayer from "./assets/idle.png";
import type { KeyboardController } from "../../KeyboardController.ts";
import clamp from "lodash/clamp";

export class Player {
    private player: Sprite;

    private speed: number = 0.6;

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
        this.player.scale.set(2, 2);
        this.drawGun();

        app.ticker.add((ticker) => {
            this.ticker = ticker
            this.render(ticker);
        })
    }

    public aim() {
        const { x: x1, y: y1 } = this.player;
        const { x: x2, y: y2 } = this.app.renderer.events.pointer.global;


        const dx = x2 - x1;
        const dy = y2 - y1;
        this.player.rotation = Math.atan2(dy, dx);
    }

    private drawGun() {
        const rect = new Graphics();


        rect.rect(0, 0, 30, 10);
        rect.fill(0xff0000);

        rect.pivot.set(0, 5);

        this.player.addChild(rect);
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
        this.aim();
    }

    public setupControls(keyboard: KeyboardController) {
        if (keyboard.isKeyPressed("W")) {
            this.setVector("y", -1);
        } else if (keyboard.isKeyPressed("S")) {
            this.setVector("y", 1);
        } else {
            this.setVector("y", 0);
        }

        if (keyboard.isKeyPressed("D")) {
            this.setVector("x", 1);
        } else if (keyboard.isKeyPressed("A")) {
            this.setVector("x", -1);
        } else {
            this.setVector("x", 0)
        }

    }

    private move(ticker: Ticker) {
        const deltaTime = ticker.deltaMS;
        this.player.x += this.vector.x * this.speed * deltaTime;
        this.player.y += this.vector.y * this.speed * deltaTime;

        const padding = 20;
        this.player.x = clamp(this.player.x, padding, this.app.screen.width - padding);
        this.player.y = clamp(this.player.y, padding, this.app.screen.height - padding);
    }

    public async dispose() {
        this.ticker?.destroy();
    }
}