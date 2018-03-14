module.exports = {
	"env": {
		"node": true,
		"jquery": true
	},
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": 8,
		"ecmaFeatures": {
			"impliedStrict": true
		}
	},
	"extends": "eslint:recommended",
	"globals": {
		"window": false,
		"document": false
	},
	"rules": {
		"block-scoped-var": 2,
		"no-console": 1,
		"no-warning-comments": 1,
		"no-shadow": 1,
		"no-sync": 1,
		"eol-last": 2,
		"linebreak-style": 2,
		"semi": 2
	}
}
