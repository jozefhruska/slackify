import React from 'react';
import ReactLoader from 'react-loader-spinner';
import theme from '../../../../theme';

/* Props - <Loader />
============================================================================= */
type Props = {};

/* <Loader />
============================================================================= */
const Loader: React.FunctionComponent<Props> = () => {
  return <ReactLoader type="ThreeDots" color={theme.colors.info} height={100} width={100} />;
};

/* Default props - <Loader />

============================================================================= */
Loader.defaultProps = {};

export default Loader;
