import type { Nullable } from '#/helpers';

let hiddenTextarea: Nullable<HTMLTextAreaElement>;

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const CONTEXT_STYLE: string[] = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];

interface NodeStyling {
  contextStyle: string;
  paddingSize: number;
  borderSize: number;
  boxSizing: string;
}

function calculateNodeStyling(targetElement: HTMLTextAreaElement): NodeStyling {
  const style = window.getComputedStyle(targetElement);

  const boxSizing = style.getPropertyValue('box-sizing');

  const paddingSize =
    (parseFloat(style.getPropertyValue('padding-bottom')) || 0) +
    (parseFloat(style.getPropertyValue('padding-top')) || 0);

  const borderSize =
    (parseFloat(style.getPropertyValue('border-bottom-width')) || 0) +
    (parseFloat(style.getPropertyValue('border-top-width')) || 0);

  const contextStyles: string[] = [];

  CONTEXT_STYLE.forEach(styleName => {
    const styleValue = style.getPropertyValue(styleName);
    if (styleValue !== '') {
      contextStyles.push(`${styleName}:${styleValue}`);
    }
  });

  const contextStyle: string = contextStyles.join(';');

  return { contextStyle, paddingSize, borderSize, boxSizing };
}

interface TextareaHeight {
  height: string;
  minHeight: string;
}

export default function calcTextareaHeight(
  targetElement: Nullable<HTMLTextAreaElement>,
  minRows = 1,
  maxRows: Nullable<number> = null
): TextareaHeight {
  const result: TextareaHeight = {
    height: '',
    minHeight: ''
  };

  if (!targetElement) return result;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  const { paddingSize, borderSize, boxSizing, contextStyle } =
    calculateNodeStyling(targetElement);

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  let height = hiddenTextarea.scrollHeight;

  if (boxSizing === 'border-box') {
    height += borderSize;
  } else if (boxSizing === 'content-box') {
    height -= paddingSize;
  }

  hiddenTextarea.value = '';
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }

  if (maxRows !== null) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }

  result.height = `${height}px`;
  hiddenTextarea.parentNode?.removeChild(hiddenTextarea);
  hiddenTextarea = null;

  return result;
}
