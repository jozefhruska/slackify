import React from 'react';
import ReactLoader from 'react-loader-spinner';

import theme from '../../../../theme';
import { Flex } from '../../layout/base';
import { Paragraph } from '../../typography';

/* <Loader />
============================================================================= */
const Loader: React.FunctionComponent = () => {
  return <ReactLoader type="ThreeDots" color={theme.colors.brand} height={100} width={100} />;
};

/* <ButtonLoader />
============================================================================= */
export const ButtonLoader: React.FunctionComponent = () => {
  return <ReactLoader type="ThreeDots" color={theme.colors.gray[0]} height={25} width={30} />;
};

/* <ListingLoader />
============================================================================= */
export const ListingLoader: React.FunctionComponent = () => {
  return <ReactLoader type="ThreeDots" color={theme.colors.brand} height={50} width={60} />;
};

/* <PageLoader /> - Props
============================================================================= */
type PageLoaderProps = {
  message?: string;
};

/* <PageLoader />
============================================================================= */
export const PageLoader: React.FunctionComponent<PageLoaderProps> = ({ message }) => {
  return (
    <Flex flexDirection="column" alignItems="center" py="s20">
      <ReactLoader type="ThreeDots" color={theme.colors.brand} height={100} width={100} />
      <Paragraph mb={0}>{message}</Paragraph>
    </Flex>
  );
};

/* <PageLoader /> - Default props
============================================================================= */
PageLoader.defaultProps = {
  message: 'Loading, please wait...',
};

export default Loader;
