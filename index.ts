type AnyFn = (...args: any[]) => any;

type FnArgs<T extends (...args: any[]) => any> = T extends (...args: infer R) => any ? R : never;

export class EventEmitter<E extends Record<string, AnyFn> = Record<string, AnyFn>> {
    private _listeners = new Map<keyof E, Set<AnyFn>>();
    private _allListeners = new Set<AnyFn>();

    on<K extends keyof E>(event: K, fn: E[K]): () => void {
        let listnenerSet = this._listeners.get(event);
        if (!listnenerSet) {
            listnenerSet = new Set<AnyFn>();
            this._listeners.set(event, listnenerSet);
        }
        listnenerSet.add(fn);
        return (): void => this.off(event, fn);
    }

    onAny(fn: <K extends keyof E>(event: K, ...args: FnArgs<E[K]>) => void): () => void {
        this._allListeners.add(fn);
        return (): void => {
            this._allListeners.delete(fn);
        };
    }

    off<K extends keyof E>(event: K, fn: E[K]): void {
        this._listeners.get(event)?.delete(fn);
    }

    emit<K extends keyof E>(event: K, ...args: FnArgs<E[K]>): void {
        this._allListeners.forEach(fn => fn(event, ...args));
        this._listeners.get(event)?.forEach(fn => fn(...args));
    }
}