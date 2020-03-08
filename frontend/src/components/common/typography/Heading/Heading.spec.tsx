import React from 'react';
import { shallow } from 'enzyme';

import { Heading } from '..';
import { THEME } from '../../../../theme';

describe('<Heading />', () => {
  it('Renders without fail. (Snapshot)', () => {
    const tree = shallow(<Heading theme={THEME} />);
    expect(tree).toMatchSnapshot();
  });
});
