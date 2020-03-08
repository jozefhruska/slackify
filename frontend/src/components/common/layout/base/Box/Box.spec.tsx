import React from 'react';
import { Box } from './Box';
import { shallow } from 'enzyme';
import { THEME } from '../../../../theme';

describe('<Box />', () => {
  it('Renders without fail. (Snapshot)', () => {
    const tree = shallow(<Box  theme={THEME} />);
    expect(tree).toMatchSnapshot();
  });
});
