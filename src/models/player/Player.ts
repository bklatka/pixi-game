import { Assets, Sprite, Ticker } from "pixi.js";
import idlePlayer from "./assets/idle.png";
import type { KeyboardController } from "../../KeyboardController.ts";
import clamp from "lodash/clamp";
import { Gun } from "./guns/Gun.ts";
import { Pistol } from "./guns/Pistol.ts";
import type { Game } from "../../Game.ts";

export class Player {
    public mainHand: Gun;
    public readonly model: Sprite;

    private speed: number = 0.2;

    private vector = {
        x: 0,
        y: 0,
    }

    private renderer;
    private keyboardHandler;

    public static async preload() {
        await Assets.load({
            alias: "player-idle",
            src: idlePlayer,
        });
    }

    public constructor(private game: Game) {
        this.model = Sprite.from("player-idle");
        this.model.label = "Player";
        this.model.scale.set(2, 2);

        this.mainHand = new Pistol(game);
        this.mainHand.draw();
        this.model.addChild(this.mainHand.model);

        this.renderer = this.render.bind(this);
        this.keyboardHandler = this.setupControls.bind(this, this.game.keyboard);
        game.app.ticker.add(this.renderer);
        game.app.ticker.add(this.keyboardHandler);
    }

    public aim() {
        const { x: x1, y: y1 } = this.model;
        const { x: x2, y: y2 } = this.game.app.renderer.events.pointer.global;


        const dx = x2 - x1;
        const dy = y2 - y1;
        this.mainHand.aim(Math.atan2(dy, dx));
    }

    public mainAction() {
        if (this.mainHand && this.mainHand instanceof Gun) {
            this.mainHand.shoot();
        }
    }

    public add() {
        this.game.app.stage.addChild(this.model);


        this.model.anchor.set(0.5, 0.5)
        this.model.x = this.game.app.screen.width / 2;
        this.model.y = this.game.app.screen.height / 2;
        this.model.scale = 1;
    }

    public setVector(dimension: "x" | "y", addValue: number) {
        this.vector[dimension] = addValue;
    }

    public render(ticker: Ticker) {
        this.move(ticker);
        this.aim();
    }

    private setupControls(keyboard: KeyboardController) {
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

        if (keyboard.isKeyPressed("R")) {
            if (this.mainHand && this.mainHand instanceof Gun) {
                this.mainHand.reload()
            }

        }
    }

    private move(ticker: Ticker) {
        const deltaTime = ticker.deltaMS;
        this.model.x += this.vector.x * this.speed * deltaTime;
        this.model.y += this.vector.y * this.speed * deltaTime;

        const padding = 20;
        this.model.x = clamp(this.model.x, padding, this.game.app.screen.width - padding);
        this.model.y = clamp(this.model.y, padding, this.game.app.screen.height - padding);
    }

    public async dispose() {
        this.game.app.ticker.remove(this.renderer);
        this.game.app.ticker.remove(this.keyboardHandler);
    }
}

