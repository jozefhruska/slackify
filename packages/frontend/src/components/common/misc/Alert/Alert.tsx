import React from 'react';
import { MarginProps } from 'styled-system';

import { Heading } from '../../typography';
import { Flex } from '../../layout/base';
import { FiCheck, FiAlertOctagon, FiInfo, FiAlertTriangle } from 'react-icons/fi';

import * as S from './Alert.styles';

/* Props - <Alert />
============================================================================= */
export type AlertProps = {
  type?: 'info' | 'success' | 'danger' | 'warning';
} & MarginProps;

/* <Alert />
============================================================================= */
const Alert: React.FunctionComponent<AlertProps> = ({ type, children, ...props }) => {
  /* Get Alert icon by it's type */
  const getIconByType = () => {
    switch (type) {
      case 'success':
        return <FiCheck size="2em" />;
      case 'danger':
        return <FiAlertOctagon size="2em" />;
      case 'warning':
        return <FiAlertTriangle size="2em" />;
      case 'info':
      default:
        return <FiInfo size="2em" />;
    }
  };

  /* Get Alert title by it's type */
  const getTitleByType = () => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'danger':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
      default:
        return 'Info';
    }
  };

  return (
    <S.Wrapper type={type} {...props}>
      <S.Icon type={type}>{getIconByType()}</S.Icon>

      <Flex flexDirection="column" ml="s6">
        <Heading as="h3" mb="s1">
          {getTitleByType()}
        </Heading>
        {children}
      </Flex>
    </S.Wrapper>
  );
};

/* Default props - <Alert />
============================================================================= */
Alert.defaultProps = {
  type: 'info',
  mb: 's6',
};

export default Alert;
