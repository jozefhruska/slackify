import React from 'react';
import { shallow } from 'enzyme';

import { Heading } from '..';
import theme from '../../../../theme';

describe('<Heading />', () => {
  it('Renders without fail. (Snapshot)', () => {
    const tree = shallow(<Heading theme={theme} />);
    expect(tree).toMatchSnapshot();
  });
});
