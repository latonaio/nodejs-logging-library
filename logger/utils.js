import 'date-utils';
import { sprintf } from 'sprintf-js';
var dt = new Date();

// 引数の型や可変長配列が渡されているかによって、ロギング処理を変更する
export default function argsTypeJudgement(msg, level, ...args) {
  const type = typeof msg;
  if (type === 'string' && args.length === 0) {
    const dict = toDictionary(msg, 'only_string', level);
    return JSON.stringify(dict);
  } else if (type === 'string' && args.length > 0) {
    const dict = toDictionary(msg, 'include_arguments', level, ...args);
    return JSON.stringify(dict);
  } else if (type === 'object') {
    const dict = toDictionary(msg, 'object', level);
    return JSON.stringify(dict);
  } else {
    console.error(msg, 'invalid argument');
    throw new Error(
      'arugument is not invalid. use string or string and ...args or dictionary'
    );
  }
}

function toDictionary(msg, argsState, level, ...args) {
  const cursor = getCallStack(4);
  const time = dt.toISOString('YYYY/MM/DD/HH24:MI:SS');
  if (argsState === 'only_string') {
    return {
      cursor: cursor,
      level: level,
      time: time,
      message: msg,
    };
  }

  if (argsState === 'include_arguments') {
    return {
      cursor: cursor,
      level: level,
      time: time,
      message: sprintf(msg, ...args),
    };
  }

  if (argsState === 'object') {
    return Object.assign({}, msg, {
      cursor: cursor,
      level: level,
      time: time,
    });
  }
}

//
function getCallStack(callColumn) {
  try {
    throw new Error('DUMMY');
  } catch (e) {
    const regixArray = e.stack.split(/[\r\n]+/).filter(function (v, v2, v3) {
      return /^ {4}at .*:[0-9]+:[0-9]+/.test(v);
    });

    let forward = regixArray[callColumn].indexOf('///') + 2;
    let back = regixArray[callColumn].indexOf(')');

    // before: '    at test (file:///Users/xxxxx/xxx/xxxx/xxxx.js:11:7)'
    // after: 'file:///Users/xxxxx/xxx/xxxx/xxxx.js:11:7'
    const unparse = regixArray[callColumn].substring(forward, back);

    // before: 'file:///Users/xxxxx/xxx/xxxx/xxxx.js:11:7'
    // after: 'file:///Users/xxxxx/xxx/xxxx/xxxx.js#L11'
    forward = unparse.lastIndexOf(':');
    const trimmed = unparse.substring(0, forward).replace(':', '#L');

    return trimmed.replace(':', '#L');
  }
}
