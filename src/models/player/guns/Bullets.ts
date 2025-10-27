import { Graphics, type PointData, type Ticker } from "pixi.js";
import type { Game } from "../../../Game.ts";


export class Bullets {
    public bullets: Graphics[] = [];

    /**
     * px per second
     * */
    private readonly bulletSpeed = 1000;

    private listener;
    public constructor(private game: Game, ) {
        this.listener = this.flyBullets.bind(this);
        game.app.ticker.add(this.listener);
    }

    public dispose() {
        this.game.app.ticker.remove(this.listener);
    }

    public add(initialPos: PointData, angle: number) {
        const bullet = new Graphics().circle(0, 0, 4).fill(0xffff00);
        bullet.position.copyFrom(initialPos);
        bullet.rotation = angle;
        bullet.label = "Bullet";

        this.game.app.stage.addChild(bullet);
        this.bullets.push(bullet);
    }

    private flyBullets(ticker: Ticker) {
        if (!this.bullets.length) {
            return;
        }

        const dt = ticker.deltaMS / 1000;

        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            bullet.x += Math.cos(bullet.rotation) * this.bulletSpeed * dt;
            bullet.y += Math.sin(bullet.rotation) * this.bulletSpeed * dt;

            if (bullet.x < 0 || bullet.x > this.game.app.screen.width || bullet.y < 0 || bullet.y > this.game.app.screen.height) {
                this.game.app.stage.removeChild(bullet);
                this.bullets.splice(i, 1);
            }
        }
    }
}