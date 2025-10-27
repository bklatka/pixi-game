import { Gun } from "./Gun.ts";
import { Graphics } from "pixi.js";
import type { Game } from "../../../Game.ts";

export class Pistol extends Gun {

    private reloadTimeoutId?: number;
    public constructor(private game: Game) {
        super();

        this.damage = 10;
        this.fireRate = 10;
        this.magazineSize = 7;
        this.magazineLoad = 7;
        this.reloadTimeInMs = 3000;
    }

    public override draw() {
        const rect = new Graphics();
        this.model = rect;
        this.model.label = "Pistol";

        rect.rect(0, 0, 30, 10);
        rect.fill(0xff0000);

        rect.pivot.set(0, 5);
    }

    public override shoot() {
        if (this.isReloading) {
            console.log('Still reloading...');
            return;
        }
        if (this.magazineLoad === 0) {
            console.log('no ammo!');
            return;
        }

        this.magazineLoad--;
        this.game.bullets.add(this.game.player.model, this.game.player.mainHand.model.rotation);


        console.log("pif paf")
    }

    public override reload() {
        if (this.isReloading) {
            return;
        }
        console.log('reloding');
        this.isReloading = true;
        this.reloadTimeoutId = setTimeout(() => {
            console.log('reloaded');
            this.isReloading = false;
            this.magazineLoad = this.magazineSize
        }, this.reloadTimeInMs);
    }

    public dispose() {
        if (this.reloadTimeoutId) {
            clearTimeout(this.reloadTimeoutId);
        }
    }
}