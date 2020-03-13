import React from 'react';
import { shallow } from 'enzyme';

import theme from '../../../../../theme';

import Grid from './Grid';

describe('<Grid />', () => {
  it('Renders without fail. (Snapshot)', () => {
    const tree = shallow(<Grid theme={theme} />);
    expect(tree).toMatchSnapshot();
  });
});
