const logger = {
  info: (...args) => console.log('[EZCompile]', ...args),
  error: (...args) => logger.info('[Error]', ...args),
};

export default logger;
