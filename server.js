const cli = require("@angular/cli").default;

cli({
	cliArgs: [
		"serve",
		"--aot",
		"--port",
		"0",
		"--ssl",
		"true",
		...process.argv.slice(2),
	]
});
