/* eslint-disable import/no-extraneous-dependencies */
import StyleDictionary from "style-dictionary";
/* eslint-disable import/no-extraneous-dependencies */

const createShadowFromTokenValue = (value) => {
    const { x, y, blur, spread, color } = value;

    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
};

const dropShadowTransformer = (token) => {
    const tokenValue = token.original.value;
    if (!Array.isArray(tokenValue)) return createShadowFromTokenValue(tokenValue);

    return token.original.value.reduce((acc, curTokenValue) => {
        const shadow = createShadowFromTokenValue(curTokenValue);
        acc.push(shadow);

        return acc;
    }, []).join(', ');

};

StyleDictionary.registerTransform({
    type: 'value',
    name: 'shadows-value/scss',
    matcher: (token) => ['dropShadow', 'boxShadow'].includes(token.type),
    transformer: dropShadowTransformer
});

StyleDictionary.extend({
  "source": ["tokens/transformed-tokens.json"],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "transforms": ["attribute/cti", "name/cti/kebab", "size/px", "color/css", "shadows-value/scss"],
      "buildPath": "src/",
      "files": [
        {
          "destination": "token-variables.scss",
          "format": "scss/variables",
          "options": {
            "showFileHeader": false
          }
        }
      ]
    }
  }
}).buildAllPlatforms();
