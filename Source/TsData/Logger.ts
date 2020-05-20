/**
 * 消息记录器
 * 允许设置消息的等级
 */
export default class Logger {

    /**
     * 日志等级
     */
    public static readonly LogLevels = {
        DEBUG: 5,
        LOG: 4,
        INFO: 3,
        WARNING: 2,
        ERROR: 1,
        NONE: 0
    };

    private static _LogCache = [];

    /**
     * 日志最大缓存数量
     */
    public static CacheMaxCount = 500;

    /**
     * 日志层级
     */
    private static _level = 4;

    /**
     * 添加新日志时调用的回调
     */
    public static OnNewCacheEntry: (entry: object) => void;

    /**
     * 添加Log到缓存
     * @param type
     * @param name
     * @param message
     * @private
     */
    private static _AddLogCache(type:string,name: string, message: string): void {
        let log = {
            type: type,
            name: name,
            message: message
        };
        Logger._LogCache.push(log);
    }


    private static _LogEnabled(name: string, message: string): void {
        console.log(">>0719<<====>", name, message);
    }

    private static _InfoEnabled(name: string, message: string): void {
        console.info(">>0719<<====>", name, message);
    }

    private static _WarnEnabled(name: string, message: string): void {
        console.warn(">>0719<<====>", name, message);
    }

    private static _ErrorEnabled(name: string, message: string): void {
        console.error(">>0719<<====>", name, message);
        this._AddLogCache("Error",name,message);
    }

    public static get LogCache(): any {
        return Logger._LogCache;
    }

    /**
     * 清除日志缓存
     */
    public static ClearLogCache(): void {
        Logger._LogCache.length = 0;
    }

    public static set setLevel(level) {
        if (Logger._level === level) return;
        Logger._level = level;
        Logger.Log = Logger._level >= Logger.LogLevels.LOG ? Logger._LogEnabled : Logger.consoleNothing;
        Logger.Info = Logger._level >= Logger.LogLevels.INFO ? Logger._InfoEnabled : Logger.consoleNothing;
        Logger.Warn = Logger._level >= Logger.LogLevels.WARNING ? Logger._WarnEnabled : Logger.consoleNothing;
        Logger.Error = Logger._level >= Logger.LogLevels.ERROR ? Logger._ErrorEnabled : Logger.consoleNothing;
    };

    private static consoleNothing() {
        // 什么都不做
    };

    public static Log: (name: string, message: string) => void = Logger._level >= Logger.LogLevels.LOG ? Logger._LogEnabled : Logger.consoleNothing;
    public static Info: (name: string, message: string) => void = Logger._level >= Logger.LogLevels.INFO ? Logger._InfoEnabled : Logger.consoleNothing;
    public static Warn: (name: string, message: string) => void = Logger._level >= Logger.LogLevels.WARNING ? Logger._WarnEnabled : Logger.consoleNothing;
    public static Error: (name: string, message: string) => void = Logger._level >= Logger.LogLevels.ERROR ? Logger._ErrorEnabled : Logger.consoleNothing;

    public static AxiosLog(name,message,url){
        console.log(">>0719AxiosLog<<====>"+name,message,url)
    }
}
