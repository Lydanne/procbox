export class HubEmitter {
  constructor(private eventMap = new Map<string, Set<any>>()) {}

  on(eventName: string, callback: any) {
    if (!this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, new Set());
    }
    this.eventMap.get(eventName)!.add(callback);
  }

  emit(eventName: string, ...args: any[]) {
    if (!this.eventMap.has(eventName)) {
      return [];
    }
    const retuneValues = [];
    for (const callback of this.eventMap.get(eventName)!) {
      retuneValues.push(callback(...args));
    }
    return retuneValues;
  }
}

export type HookFactory<R = unknown> = (hub: Hub) => R;
export type HubFactory = () => Hub;

export class Hub {
  private _isInit = false;
  public hubFactory!: HubFactory;
  private importMap = new Map<HubFactory, Hub>();
  private exportSet = new Set<HookFactory>();
  private provideMap = new Map<string | HookFactory, HookFactory>();
  private useHookMap = new Map<string | HookFactory, any>();
  private eventEmitter = new HubEmitter();
  private parent: Hub | null = null;

  event() {
    return this.eventEmitter;
  }

  isInit() {
    return this._isInit;
  }

  isProvide<R>(key: string | HookFactory<R>): boolean {
    return this.provideMap.has(key);
  }

  isLoadedProvide<R>(key: string | HookFactory<R>): boolean {
    return this.useHookMap.has(key);
  }

  provide<R>(factory: HookFactory<R>): this;
  provide<R>(key: string, factory: HookFactory<R>): this;
  provide<R>(key: string | HookFactory<R>, factory?: HookFactory<R>): this {
    let callFactory = key instanceof Function ? key : factory;
    if (typeof callFactory !== "function") {
      return this;
    }

    this.provideMap.set(key, callFactory);

    return this;
  }

  inject<R>(factory: HookFactory<R>): R {
    let useHook = this.useHookMap.get(factory);

    if (this.isProvide(factory)) {
      return new Proxy(
        {},
        {
          get: (_, key) => {
            return (
              useHook?.[key] ??
              ((...args: any[]) => {
                useHook = this.useHookMap.get(factory);
                return useHook?.[key](...args);
              })
            );
          },
        }
      ) as unknown as R;
    } else {
      for (const [_, hub] of this.importMap) {
        if (hub.isExport(factory)) {
          return hub.inject(factory);
        }
      }

      if (this.parent && this.parent.isExport(factory)) {
        return this.parent.inject(factory);
      }

      throw new Error('Can not find inject factory "' + factory.name + '"');
    }
  }

  isExport(factory: HookFactory) {
    let isExport = this.exportSet.has(factory);

    if (isExport) {
      return true;
    }

    for (const [_, hub] of this.importMap) {
      isExport = hub.isExport(factory);
      if (isExport) {
        return true;
      }
    }

    return false;
  }

  async init() {
    Hub.activeHub.push(this);

    for (const [_, hub] of this.importMap) {
      await hub.init();
    }

    for (const [_, provide] of this.provideMap) {
      Reflect.defineMetadata("isInciting", true, provide);
      const useHook: any = provide(true as any);
      Object.defineProperty(useHook, "name", { value: provide.name });
      this.useHookMap.set(provide, useHook);
      Reflect.defineMetadata("isInciting", false, provide);
    }

    await Promise.all(this.eventEmitter.emit("init"));
    this._isInit = true;
    Hub.activeHub.pop();
  }

  close() {
    this.eventEmitter.emit("close");
    this.importMap.forEach((hub) => hub.close());
  }

  import(hubFactory: HubFactory): this {
    const hub = hubFactory();
    hub.setParent(this);
    this.importMap.set(hubFactory, hub);
    return this;
  }

  setParent(hub: Hub) {
    this.parent = hub;
    return this;
  }

  export<R>(factory: HookFactory<R>): this {
    this.exportSet.add(factory);
    return this;
  }

  hub(fun: () => any) {
    this.hubFactory = fun;
    return this;
  }

  native() {
    return this;
  }

  static activeHub: Hub[] = [];
}

export function createHub() {
  return new Hub();
}

export function defHubProvide<R>(factory: HookFactory<R>, deps?: any[]) {
  return factory;
}

export function useHub(): Hub {
  return new Proxy(
    {},
    {
      get(_, key) {
        const activeHub = Hub.activeHub[Hub.activeHub.length - 1];
        return activeHub[key as keyof Hub].bind(activeHub);
      },
    }
  ) as Hub;
}

export function onInit(cb: () => any) {
  const hub = useHub();

  hub.event().on("init", cb);
}
export function onClose(cb: () => any) {
  const hub = useHub();

  hub.event().on("close", cb);
}

export function defHook<R>(cb: () => R, options?: any): () => R {
  function hookProxy(): R {
    const isInciting: boolean = Reflect.getMetadata("isInciting", hookProxy);
    const hub = useHub();
    if (isInciting) {
      return cb();
    } else {
      return hub.inject(hookProxy as any);
    }
  }
  Object.defineProperty(hookProxy, "name", { value: `_${cb.name}` });
  return hookProxy;
}
