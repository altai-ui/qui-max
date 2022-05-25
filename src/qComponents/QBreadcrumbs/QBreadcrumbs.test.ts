import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import { QBreadcrumbs } from './index';

describe('QBreadcrumbs', () => {
  it('element should match snapshot', async () => {
    const { element } = shallowMount(QBreadcrumbs);

    expect(element).toMatchSnapshot();
  });
});
