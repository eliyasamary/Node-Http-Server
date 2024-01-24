const winston = require('winston');

const customColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
};

const loggerFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
        const color = customColors[level] || 'white';
        return `\u001b[38;5;${winston.config.addColors(customColors)[level]}m[${timestamp}] ${level}:\u001b[0m ${message}`;
    })
);

winston.addColors(customColors);

const logger = winston.createLogger({
    format: loggerFormat,
    transports: [new winston.transports.Console()],
});

module.exports = logger;
