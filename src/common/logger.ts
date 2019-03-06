import * as winston from 'winston'

export function createLogger() {
  const logger = winston.createLogger({
    level: 'debug',

    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.json()
    ),

    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple()
        ),
      }),

      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  })

  return logger
}
