module.exports = {
    "source": ["tokens/transformed-tokens.json"],
    "platforms": {
        "scss": {
            "transformGroup": "scss",
            "transforms": ["attribute/cti", "name/cti/kebab", "size/px", "color/css"],
            "buildPath": "src/",
            "files": [
                {
                    "destination": "token-variables.scss",
                    "format": "scss/map-deep",
                    "options": {
                        "showFileHeader": false
                    },
                    "filter": (token) => token.value !== 'dropShadow'
                }
            ]
        }
    }
}