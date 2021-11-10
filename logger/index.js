import argsTypeJudgement from './utils.js';
export default class Logger {
  Fatal(msg, ...args) {
    console.error(argsTypeJudgement(msg, 'FATAL', ...args));
    throw new Error(msg);
  }
  Error(msg, ...args) {
    console.error(argsTypeJudgement(msg, 'ERROR', ...args));
  }
  Warn(msg, ...args) {
    console.error(argsTypeJudgement(msg, 'WARN', ...args));
  }
  Info(msg, ...args) {
    console.log(argsTypeJudgement(msg, 'INFO', ...args));
  }
  Debug(msg, ...args) {
    console.log(argsTypeJudgement(msg, 'DEBUG', ...args));
  }
}
