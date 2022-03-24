import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Component from './index';

describe('QBreadcrumbs', () => {
  it('element should match snapshot', async () => {
    const { element } = await shallowMount(Component);

    expect(element).toMatchSnapshot();
  });
});
