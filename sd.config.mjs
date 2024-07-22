/* eslint-disable import/no-extraneous-dependencies */
import StyleDictionary from "style-dictionary";
/* eslint-disable import/no-extraneous-dependencies */

const createShadowFromTokenValue = (value) => {
    const { x, y, blur, spread, color } = value;

    const shadowValues = [x, y, blur, spread];

    const isShadowValueNone = shadowValues.every(val => !val);

    if (isShadowValueNone) return 'none';

    return `${shadowValues.join('px ')} ${color}`;
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
    name: 'shadows-value/css',
    matcher: (token) => ['dropShadow', 'boxShadow'].includes(token.type),
    transformer: dropShadowTransformer
});

StyleDictionary.registerFilter({
    name: 'token-set-order/css',
    matcher: (token) => !token.attributes.category.includes('tokenSetOrder'),
});

StyleDictionary.extend({
  "source": ["tokens/transformed-tokens.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "transforms": ["attribute/cti", "name/cti/kebab", "size/px", "color/css", "shadows-value/css"],
      "buildPath": "src/",
      "files": [
        {
          "destination": "token-variables.scss",
          "format": "css/variables",
          "options": {
            "showFileHeader": false
          },
            filter: 'token-set-order/css'
        }
      ]
    }
  }
}).buildAllPlatforms();
