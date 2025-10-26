import type { Graphics, Sprite } from "pixi.js";


export abstract class Gun {
    public model: Graphics | Sprite;
    protected magazineSize: number = 0;
    protected magazineLoad: number = 0;
    protected damage: number = 0;
    protected fireRate: number = 0;
    protected reloadTimeInMs: number = 5000;
    protected isReloading = false;

    public constructor() {

    }

    public aim(angle: number) {
        this.model.rotation = angle;
    }

    public shoot() {

    }

    public reload() {

    }

    public draw() {

    }
}


