import React from 'react';
import { shallow } from 'enzyme';

import { Paragraph } from '..';
import theme from '../../../../theme';

describe('<Paragraph />', () => {
  it('Renders without fail. (Snapshot)', () => {
    const tree = shallow(<Paragraph theme={theme} />);
    expect(tree).toMatchSnapshot();
  });
});
