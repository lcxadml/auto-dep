const winston = require("winston");

/**
 * 执行终端命令
 */
const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    try {
      const childrenProcess = spawn(...args);
      childrenProcess.stdout.pipe(process.stdout);
      childrenProcess.stderr.pipe(process.stderr);
      childrenProcess.on("close", () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

const logger = winston.createLogger({
  level: "info", // 你可以设置为 'debug', 'info', 'warn', 'error', 等
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  defaultMeta: { service: "Docs-api-trigger" },
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

module.exports = {
  commandSpawn,
  logger,
};
