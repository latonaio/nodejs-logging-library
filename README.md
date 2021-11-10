# nodejs-logging-library

nodejs-logging-library は、Nodejs ランタイム の マイクロサービス の ログ を出力する際に、ログの json フォーマットを統一するためのライブラリです。

## 動作環境

動作には以下の環境であることを前提とします。

* OS: Linux OS    
* CPU: ARM/AMD/Intel  
* Nodejs Runtime

## 利用方法

本リポジトリをインストールしてください。

```sh
npm install git+ssh://git@github.com/latonaio/nodejs-logging-library

```

各マイクロサービスのソース内に以下を配置してください。

```javascript
import Logger from 'nodejs-logging-library/logger/index.js';
```

ログの出力例は以下の通りです。

```javascript
import Logger from 'nodejs-logging-library/logger/index.js';

function main() {
  let log = new Logger();
  log.Debug('test');
}

main();
```

出力の形式

- log.Fatal(msg)
- log.Error(msg)
- log.Warn (msg)
- log.Info (msg)
- log.Debug(msg)

パラメーター

- msg: 文字列で渡した場合と dictionary で渡した場合で挙動が異なります。

ログ出力詳細

```javascript
// 引数に文字列を渡した場合
log.Debug('test');
{"cursor":"/Users/hosaka_shinnosuke/dev/nodejs-logging-library/test.js#L5","level":"DEBUG","time":"2021-11-10T10:07:30.164Z","message":"test"}

// 引数を文字列に渡した場合、フォーマット指定することも可能です
log.Debug('%2$s %3$s a %1$s', 'cracker', 'Polly', 'wants');
{"cursor":"/Users/hosaka_shinnosuke/dev/nodejs-logging-library/test.js#L6","level":"DEBUG","time":"2021-11-10T10:07:30.164Z","message":"Polly wants a cracker"}

// dictionaryを渡した場合
log.Debug({ message: 'hello', param: { id: 1, name: 'ancle' } });
{"message":"hello","param":{"id":1,"name":"ancle"},"cursor":"/Users/hosaka_shinnosuke/dev/nodejs-logging-library/test.js#L7","level":"DEBUG","time":"2021-11-10T10:07:30.164Z"}
```
