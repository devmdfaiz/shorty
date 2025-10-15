import type { NextFunction, Request, Response } from "express";
import pc from "picocolors";

const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
	const log = {
		time: new Date().toISOString(),
		method: req.method,
		path: req.path,
		query: req.query,
		host: req.hostname,
		ip: req.ip,
		body: req.body || {},
	};

	// Colorize method
	let coloredMethod = req.method;
	switch (req.method) {
		case "GET":
			coloredMethod = pc.green(req.method);
			break;
		case "POST":
			coloredMethod = pc.blue(req.method);
			break;
		case "PUT":
			coloredMethod = pc.yellow(req.method);
			break;
		case "DELETE":
			coloredMethod = pc.red(req.method);
			break;
		default:
			coloredMethod = pc.cyan(req.method);
	}

	// Full pretty template string with all colors
	const logString = `
${pc.bold(`[${log.time}]`)} ${coloredMethod} ${pc.magenta(log.path)}
Host: ${pc.cyan(log.host)} | IP: ${pc.green(log.ip)}
Body: ${pc.dim(JSON.stringify(log.body, null, 2))}
Query: ${pc.dim(JSON.stringify(log.query, null, 2))}
  `;

	console.log(logString);

	next();
};

export default loggerMiddleware;
