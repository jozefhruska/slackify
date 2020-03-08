import React from 'react';
import { shallow } from 'enzyme';

import { Paragraph } from '..';
import { THEME } from '../../../../theme';

describe('<Paragraph />', () => {
  it('Renders without fail. (Snapshot)', () => {
    const tree = shallow(<Paragraph theme={THEME} />);
    expect(tree).toMatchSnapshot();
  });
});
