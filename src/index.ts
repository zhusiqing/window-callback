export type SyncHandlerType = Function;
export type AsyncHandlerType = <T>(...args: T[]) => Promise<any>;
export type HandlerType = SyncHandlerType;
export type DispatchEventType = (type: string, ...params: any[]) => void;

export class CallbackManager {
  private methods: Map<string, Set<HandlerType>> = new Map();
  constructor() {
    this.methods.clear();
  }

  /**
   * 执行自定义事件
   */
  private _dispatchEvent(type: string, ...params: any[]): void {
    if (this.methods.has(type)) {
      this.methods.get(type)?.forEach(handler => {
        handler(...params);
      });
    }
  }

  /**
   * 在window上注册事件监听
   * @param type 事件类型
   * @param extraHandler 自定义window处理函数
   */
  public register(
    type: string,
    extraHandler?: (dispatchEvent: DispatchEventType) => void,
  ) {
    const handler = async (data: any) => {
      this._dispatchEvent(type, data);
    };
    if (extraHandler) {
      extraHandler(this._dispatchEvent);
    } else {
      if (window) {
        (window as any)[type] = handler;
      }
    }
  }

  /**
   * 添加自定义事件
   * @param {string} type 事件类型
   * @param {Function} handler 回调函数
   * @param {Function} [extraHandler] 额外处理函数
   */
  public add(type: string, handler: SyncHandlerType): void;
  public add(type: string, handler: AsyncHandlerType): void;
  public add(type: string, handler: HandlerType): void {
    if (!this.methods.has(type)) {
      this.methods.set(type, new Set([handler]));
      this.register(type);
    } else {
      this.methods.get(type)?.add(handler);
    }
  }

  /**
   * 删除自定义事件
   * @param {String} type 事件类型
   * @param {Function} handler 回调函数
   */
  public remove(type: string, handler: HandlerType): void {
    if (this.methods.has(type)) {
      this.methods.get(type)?.delete(handler);
    }
  }

  /**
   * 清空注册的对应事件下回调函数
   */
  public clear(type: string) {
    if (this.methods.has(type)) {
      this.methods.delete(type);
    }
  }
}

export const callbackManager = new CallbackManager();

export default CallbackManager;
