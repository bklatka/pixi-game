import { Gun } from "./Gun.ts";
import { Graphics } from "pixi.js";

export class Pistol extends Gun {

    public constructor() {
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
        console.log("pif paf")
    }

    public override reload() {
        if (this.isReloading) {
            return;
        }
        console.log('reloding');
        this.isReloading = true;
        setTimeout(() => {
            console.log('reloaded');
            this.isReloading = false;
            this.magazineLoad = this.magazineSize
        }, this.reloadTimeInMs);
    }
}