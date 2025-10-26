import { Application, type Ticker } from "pixi.js";

export class KeyboardController {
    private pressedKey: Set<string> = new Set();

    private listeners: ((e: KeyboardEvent) => void)[] = [];

    private bindings: Binding[] = [];

    private ticker?: Ticker;
    public constructor(private app: Application) {
        const downListener = this.onKeyDown.bind(this);
        const upListener = this.onKeyUp.bind(this);
        window.addEventListener('keydown', downListener);
        window.addEventListener('keyup', upListener);

        this.listeners.push(downListener, upListener)

        this.app.ticker.add(ticker => {
            this.ticker = ticker;

            this.bindings.forEach(binder => {
                if (this.pressedKey.has(binder.keyName)) {
                    binder.callback();
                }
            })


        })
    }

    public onKeyDown(e: KeyboardEvent) {
        if (!e.repeat) {
            this.pressedKey.add(e.key.toLocaleLowerCase());
        }
    }

    public onKeyUp(e: KeyboardEvent) {
        this.pressedKey.delete(e.key.toLocaleLowerCase());
    }

    public addBinding(key: string, callback: () => void) {
        this.bindings.push({
            keyName: key.toLocaleLowerCase(),
            callback: callback,
        })
    }

    public async dispose() {
        this.ticker?.destroy();
    }
}

interface Binding {
    keyName: string;
    onDown: () => void;
    onUp: () => void;
}