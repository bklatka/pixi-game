import { Gun } from "./Gun.ts";
import { Graphics, type Ticker } from "pixi.js";
import type { Game } from "../../../Game.ts";

export class Pistol extends Gun {

    public reloadProgress = 0;
    private reloadStartTime: null | number = null;
    private reloadTimeoutId?: number;
    private reloadProgressUpdater;
    public constructor(private game: Game) {
        super();

        this.damage = 10;
        this.fireRate = 10;
        this.magazineSize = 7;
        this.magazineLoad = 7;
        this.reloadTimeInMs = 3000;
    }

    public getMagazineLoad(): number {
        return this.magazineLoad;
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
        if (!this.game.player.mainHand) {
            return;
        }

        if (this.magazineLoad === 0) {
            return;
        }

        this.magazineLoad--;
        this.game.bullets.add(this.game.player.model, this.game.player.mainHand.model.rotation);
    }

    public override reload() {
        if (this.reloadStartTime !== null) {
            return;
        }
        this.magazineLoad = 0;
        this.isReloading = true;
        this.reloadProgress = 0;
        this.reloadStartTime = performance.now();

        this.reloadProgressUpdater = this.updateReloadPRogress.bind(this);
        this.game.app.ticker.add(this.reloadProgressUpdater);
    }

    private updateReloadPRogress() {
        if (this.reloadStartTime == null) return;

        const elapsed = performance.now() - this.reloadStartTime;
        const progress = Math.min(elapsed / this.reloadTimeInMs, 1);
        this.reloadProgress = progress;

        // 🔸 Po osiągnięciu 100% usuń callback z tickera
        if (progress >= 1) {
            this.reloadStartTime = null;
            this.magazineLoad = this.magazineSize;
            this.game.app.ticker.remove(this.reloadProgressUpdater);
        }
    }

    public dispose() {
        if (this.reloadTimeoutId) {
            clearTimeout(this.reloadTimeoutId);
        }
    }
}