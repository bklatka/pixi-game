import type { Game } from "../Game.ts";
import { Container, Graphics, Text } from "pixi.js"

const PADDING = 20;
const UI_WIDTH = 200;

export class GameUI {



    private bulletText: Text;
    private magazineLoading: Graphics;
    private updater;

    private container: Container;
    public constructor(private game: Game) {

        this.updater = this.update.bind(this);
        this.container = new Container();
        this.container.label = "UI";
        this.container.position.set(this.game.app.screen.width - PADDING - UI_WIDTH, PADDING);


        this.draw();

        this.game.app.stage.addChild(this.container);
        game.app.ticker.add(this.updater);
    }

    public draw() {
        this.drawMagazineSize();
        this.drawReloadBar();
    }

    public update() {
        if (this.bulletText && this.bulletText.text !== this.game.player.mainHand?.getMagazineLoad().toString()) {
            this.bulletText.text = this.game.player.mainHand?.getMagazineLoad().toString() ?? "0";
        }

        this.magazineLoading.scale.x = this.game.player.mainHand?.reloadProgress ?? 1;

    }

    private drawReloadBar() {
        const width = 200;
        const height = 20;
        const graphics = new Graphics().rect(0, 40, width, height);
        graphics.stroke("#000000");
        this.container.addChild(graphics);

        this.magazineLoading = new Graphics().rect(0, 41, 200, height - 1);
        this.magazineLoading.fill("#ffffff");
        this.magazineLoading.alpha = 0.7;
        this.container.addChild(this.magazineLoading);
    }

    private drawMagazineSize() {
        const bulletsLeftInMagazine = this.game.player?.mainHand?.getMagazineLoad() ?? 0;
        this.bulletText = this.makeHUDLabel(String(bulletsLeftInMagazine), UI_WIDTH - PADDING, 0, 0, 0);

        this.container.addChild(this.bulletText);

        const info = this.makeHUDLabel("Press R to reload", 30, 42, 0, 0);
        info.style.fontSize = 13;

        this.container.addChild(info);

    }

    private makeHUDLabel(text: string, x: number, y: number, anchorX = 0, anchorY = 0) {
        const label = new Text({
            text: text,
            style: {
                fill: "#000000",
                fontSize: 32,
                fontFamily: "monospace",
            }
        });
        label.label = "MagazineSize";
        label.anchor.set(anchorX, anchorY);
        label.position.set(x, y);
        return label;
    }

    public dispose() {
        this.game.app.ticker.remove(this.updater);
    }

}