# 源码分析

## 文件结构

``` bash
├── index.d.ts - 声明文件
├── index.js - 入口文件，暴露各种模块
├── lib
|  ├── egg
|  |  ├── console_logger.js
|  |  ├── context_logger.js - 整理信息格式，调用传入的logger的log方法，分级error,warn,info,debug输出。
|  |  ├── custom_logger.js
|  |  ├── error_logger.js
|  |  ├── logger.js
|  |  └── loggers.js
|  ├── level.js
|  ├── logger.js
|  ├── transports
|  |  ├── console.js
|  |  ├── file.js
|  |  ├── file_buffer.js
|  |  └── transport.js
|  └── utils.js
```

## 外部模块依赖

![](./graphviz/egg-logger.svg)

## 内部模块依赖

![](./graphviz/egg-logger_inline.gv.svg)

## 各文件分析

### index.js

入口文件，综合引用暴露出去。

![](./graphviz/index.svg)

### lib/egg/context_logger.js

整理信息格式，调用传入的logger的log方法，分级error,warn,info,debug输出。

![](./graphviz/lib_egg_context_logger.svg)


### lib/egg/loggers.js

继承自Map对象，基于lib/egg/logger.js实例化了logger,corelogger。基于custom_logger.js实现自定义logger。

![](./graphviz/lib_egg_loggers.svg)

### lib/egg/error_logger.js

继承自lib/egg/logger.js，增加了默认level为error

![](./graphviz/lib_egg_error_logger.svg)


### lib/egg/logger.js

继承自lib/logger.js，底层绑定不同的transform：files/console/file_buffer。

![](./graphviz/lib_egg_logger.svg)


### lib/logger.js

封装对transport的操作

### lib/transports/file_buffer.js

继承自lib/transports/files.js，区别在于写入时利用Buffer。

![](./graphviz/lib_transports_file_buffer.svg)


### lib/transports/files.js

继承自lib/transports/transport.js，通过流的方式，写入日志内容。

![](./graphviz/lib_transports_files.svg)


### lib/transports/transport.js

封装了log，enable，disable等方法。

![](./graphviz/lib_transports_transport.svg)

### lib/transports/console.js

继承自lib/transports/transport.js，通过process.stdout.write和process.stderr.write的方式，写入日志内容。

![](./graphviz/lib_transports_console.svg)

### lib/egg/custom_logger.js

继承自lib/egg/logger, 啥也没做暴露空类。

![](./graphviz/lib_egg_custom_logger.svg)


