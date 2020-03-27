import React, { useState } from 'react';
import { Manager, Reference, Popper, PopperProps } from 'react-popper';

import Button, { ButtonProps } from '../Button/Button';

import * as S from './PopperButton.styles';

/* Props - <PopperButton />
============================================================================= */
type Props = {
  options: Array<{ text?: string } & ButtonProps>;
  children: (ref: React.Ref<HTMLButtonElement>, onClick: () => void) => React.ReactElement;
} & Pick<PopperProps, 'placement'>;

/* <PopperButton />
============================================================================= */
const PopperButton: React.FC<Props> = ({ options, children, ...props }) => {
  const [isPopperVisible, setPopperVisible] = useState<boolean>(false);

  /**
   * Handles click event on the reference element
   */
  const handleClick = () => {
    setPopperVisible(!isPopperVisible);
  };

  return (
    <Manager>
      <Reference>{({ ref }) => children(ref, handleClick)}</Reference>

      {isPopperVisible && (
        <Popper {...props}>
          {({ ref, style, placement }) => (
            <S.PopperWrapper ref={ref} style={style} data-placement={placement}>
              {options?.map(({ text, ...buttonProps }, key) => (
                <Button key={key} {...buttonProps}>
                  {text ? text : ''}
                </Button>
              ))}
            </S.PopperWrapper>
          )}
        </Popper>
      )}
    </Manager>
  );
};

/* Default props - <PopperButton />
============================================================================= */
PopperButton.defaultProps = {
  placement: 'top',
};

export default PopperButton;
