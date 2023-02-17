import { createLogger, format, transports } from "winston";

const logger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      filename: "all-logging.log",
    }),
    new transports.File({
      level: "error",
      filename: "logging-error.log",
    }),
    // new transports.MongoDB({
    //   db: process.env.MONGODB_URI,
    //   collection: "logs",
    // }),
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.metadata(),
    format.prettyPrint()
  ),
  statusLevels: true,
});

export default logger;
