#!/usr/bin/env osascript -l JavaScript

ObjC.import("stdlib");
ObjC.import("Foundation");
const app = Application.currentApplication();
app.includeStandardAdditions = true;

//──────────────────────────────────────────────────────────────────────────────

/** @param {string} path */
function readFile(path) {
	const data = $.NSFileManager.defaultManager.contentsAtPath(path);
	const str = $.NSString.alloc.initWithDataEncoding(data, $.NSUTF8StringEncoding);
	return ObjC.unwrap(str);
}

/**
 * @param {string} file
 * @param {string} text
 */
function writeToFile(file, text) {
	const str = $.NSString.alloc.initWithUTF8String(text);
	str.writeToFileAtomicallyEncodingError(file, true, $.NSUTF8StringEncoding, null);
}

const isHeading = (/** @type {string} */ line) => /^#+ /.test(line);
const isEmpty = (/** @type {string} */ line) => /^\s*$/.test(line);
const fileExists = (/** @type {string} */ filePath) => Application("Finder").exists(Path(filePath));

/**
 * @param {string[]} fileLines
 * @param {number} lineNo
 */
function ensureEmptyLineAt(fileLines, lineNo) {
	if (lineNo >= fileLines.length || !isEmpty(fileLines[lineNo])) {
		fileLines.splice(lineNo, 0, "");
	}
}

//──────────────────────────────────────────────────────────────────────────────
/** @type {AlfredRun} */
// biome-ignore lint/correctness/noUnusedVariables: Alfred run
function run(argv) {
	const vaultPath = $.getenv("vault_path");
	const taskHeading = $.getenv("task_header");
	const otherHeading = $.getenv("other_header");
	const dailyNotePath = $.getenv("note_path");
	const clipboard = $.getenv("clipboard");
	const date = $.getenv("date");
	console.log(vaultPath);
	console.log(dailyNotePath);
	console.log(vaultPath, taskHeading, otherHeading, dailyNotePath);

	console.log("clipboard: ", clipboard);

	const toAppend = argv[0];
	console.log(toAppend);
	console.log(toAppend);
	// return [];

	// return [];

	let relativePath = dailyNotePath;
	let absolutePath = vaultPath + "/" + relativePath;
	if (absolutePath.slice(-3) !== ".md") absolutePath += ".md";

	console.log(absolutePath, toAppend);


	const resultsArr = [];
   //
	if (!fileExists(absolutePath)) {
		resultsArr["push"]({
			title: "Create Daily Note?",
			subtitle: "Daily Note doesn't exist? Create it?",
			arg: "create",
		});
	} else {
		resultsArr.push(
		{
			title: "- [ ] " + toAppend,
			subtitle: "Will append: - [ ] " + toAppend,
			arg: "- [ ] " + toAppend,
			valid: true,
		},
      {
			title: "- [ ] " + toAppend + " 📅 " + date,
			subtitle: "Will append: - [ ] " + toAppend + " 📅 " + date,
			arg: "- [ ] " + toAppend + " 📅 " + date,
			valid: true,
		},

      {
			title: "- [ ] " + toAppend + " [link](" + clipboard + ")",
			subtitle: "Will append: - [ ] " + toAppend+ " [link](" + clipboard + ")",
			arg: "- [ ] " + toAppend +  " [link](" + clipboard + ")",
			valid: true,
		},

		{
			title: "- " + toAppend,
			subtitle: "Will append: - " + toAppend,
			arg: "- " + toAppend,
			valid: true,

		})
	}

	if (resultsArr.length === 0) {
		resultsArr.push({
			title: "🚫 No notes found.",
			subtitle: "⛔ Possible causes: folder is empty or excluded in the Obsidian settings.",
			arg: "No daily found",
		});
	}

	// INFO not using Alfred's caching mechanism, as it breaks browsing folders
	// see https://github.com/chrisgrieser/shimmering-obsidian/issues/176
	return JSON.stringify({ items: resultsArr });

}
