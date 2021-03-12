export default {
  methods: {
    handleInput(val, { inputType }) {
      const timeLength = this.timepicker ? 6 : 0;
      const options =
        this.$options.name === 'QTimePicker'
          ? { separator: ':', maxLength: 8 + timeLength }
          : { separator: '.', maxLength: 10 + timeLength };
      if (inputType === 'deleteContentBackward' && !this.userInput) {
        this.userInput = '';
        return;
      }

      const clearVal = val.replace(/ |,|:|\./g, '');
      const array = clearVal.split('');

      if (
        inputType === 'insertText' &&
        !array[array.length - 1]?.match(/[0-9]+/)
      )
        return;

      if (array.length > 1) array.splice(2, 0, options.separator);
      if (array.length > 3 && array.length !== 4)
        array.splice(5, 0, options.separator);
      if (array.length > options.maxLength) return;

      if (timeLength) {
        if (array.length > 10) array.splice(10, 0, ', ');
        if (array.length > 13) array.splice(13, 0, ':');
        if (array.length > 15) array.splice(16, 0, ':');
      }

      if (
        inputType === 'deleteContentBackward' &&
        ['.', ':'].includes(array[array.length - 1])
      ) {
        array.pop();
      }

      const parsedInputValue = array.join('');
      this.userInput = parsedInputValue;
      this.$emit('input', parsedInputValue);
    }
  }
};
