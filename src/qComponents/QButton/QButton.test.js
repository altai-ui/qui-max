import Component from './src/QButton';

describe('QButton', () => {
  it('should match snapshot', () => {
    const { element } = shallowMount(Component);
    expect(element).toMatchSnapshot();
  });

  it(`should have class 'q-button_type_icon' if type is icon`, () => {
    const instance = shallowMount(Component);
    const expected = 'q-button_type_icon';
    instance.setProps({
      type: 'icon'
    });
    expect(instance.vm.classes).toContain(expected);
  });

  it(`should have class 'q-button_theme_link' if theme is link`, () => {
    const instance = shallowMount(Component);
    const expected = 'q-button_theme_link';
    instance.setProps({
      theme: 'link'
    });
    expect(instance.vm.classes).toContain(expected);
  });

  describe('handleClick', () => {
    it('should emit click', () => {
      const instance = shallowMount(Component);
      instance.vm.handleClick();
      expect(instance.emitted().click).toBeTruthy();
    });
  });
});
