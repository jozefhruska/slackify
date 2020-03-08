import React from 'react';
import Flex from './Flex';
import { shallow } from 'enzyme';
import { THEME } from '../../../../theme';

describe('<Flex />', () => {
  it('Renders without fail. (Snapshot)', () => {
    const tree = shallow(<Flex theme={THEME} />);
    expect(tree).toMatchSnapshot();
  });
});
