[{
	"resource": "/c:/Users/Erick/Documents/proyectos/clappy/frontend/src/App.jsx",
	"owner": "typescript",
	"code": "1261",
	"severity": 8,
	"message": "Already included file name 'c:/Users/Erick/Documents/proyectos/clappy/frontend/src/components/layout/layout.jsx' differs from file name 'c:/Users/Erick/Documents/proyectos/clappy/frontend/src/components/layout/Layout.jsx' only in casing.\n  The file is in the program because:\n    Imported via './components/layout/layout' from file 'c:/Users/Erick/Documents/proyectos/clappy/frontend/src/App.jsx'\n    Root file specified for compilation",
	"source": "ts",
	"startLineNumber": 8,
	"startColumn": 20,
	"endLineNumber": 8,
	"endColumn": 48,
	"origin": "extHost1"
}]



 [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.