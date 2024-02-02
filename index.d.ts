declare type SyncHandlerType = Function;
declare type AsyncHandlerType = <T>(...args: T[]) => Promise<any>;
declare type HandlerType = SyncHandlerType;
declare type DispatchEventType = (type: string, ...params: any[]) => void;
declare class CallbackManager {
    private methods;
    constructor();
    /**
     * 执行自定义事件
     */
    private _dispatchEvent;
    /**
     * 在window上注册事件监听
     * @param type 事件类型
     * @param extraHandler 自定义window处理函数
     */
    register(type: string, extraHandler?: (dispatchEvent: DispatchEventType) => void): void;
    /**
     * 添加自定义事件
     * @param {string} type 事件类型
     * @param {Function} handler 回调函数
     * @param {Function} [extraHandler] 额外处理函数
     */
    add(type: string, handler: SyncHandlerType): void;
    add(type: string, handler: AsyncHandlerType): void;
    /**
     * 删除自定义事件
     * @param {String} type 事件类型
     * @param {Function} handler 回调函数
     */
    remove(type: string, handler: HandlerType): void;
    /**
     * 清空注册的对应事件下回调函数
     */
    clear(type: string): void;
}
declare const callbackManager: CallbackManager;

export { AsyncHandlerType, CallbackManager, DispatchEventType, HandlerType, SyncHandlerType, callbackManager, CallbackManager as default };
