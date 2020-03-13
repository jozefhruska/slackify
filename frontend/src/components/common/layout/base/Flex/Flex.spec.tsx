import React from 'react';
import { shallow } from 'enzyme';

import Flex from './Flex';
import theme from '../../../../../theme';

describe('<Flex />', () => {
  it('Renders without fail. (Snapshot)', () => {
    const tree = shallow(<Flex theme={theme} />);
    expect(tree).toMatchSnapshot();
  });
});
