import React from 'react';
import { shallow } from 'enzyme';

import { Box } from './Box';
import theme from '../../../../../theme';

describe('<Box />', () => {
  it('Renders without fail. (Snapshot)', () => {
    const tree = shallow(<Box theme={theme} />);
    expect(tree).toMatchSnapshot();
  });
});
