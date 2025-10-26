import { Application, type Ticker } from "pixi.js";

export class KeyboardController {
    private pressedKey: Set<string> = new Set();

    private upListener;
    private downListener;

    public bindings: Binding[] = [];

    private ticker?: Ticker;
    public constructor(private app: Application) {
        this.downListener = this.onKeyDown.bind(this);
        this.upListener = this.onKeyUp.bind(this);
        window.addEventListener('keydown', this.downListener);
        window.addEventListener('keyup', this.upListener);
    }

    public onKeyDown(e: KeyboardEvent) {
        if (!e.repeat) {
            this.pressedKey.add(e.key.toLocaleLowerCase());
        }
    }

    public onKeyUp(e: KeyboardEvent) {
        this.pressedKey.delete(e.key.toLocaleLowerCase());
    }

    public isKeyPressed(keyName: string): boolean {
        return this.pressedKey.has(keyName.toLocaleLowerCase());
    }

    public registerBinding(callback: (pressed: Set<string>) => void) {
        this.bindings.push(callback)
    }

    public async dispose() {
        this.ticker?.destroy();

        window.removeEventListener('keydown', this.downListener);
        window.removeEventListener('keyup', this.upListener);
    }
}

type Binding = (pressed: Set<string>) => void;