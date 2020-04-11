import React from 'react';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

/* Props - <ActiveLink />
============================================================================= */
type Props = {
  href: LinkProps['href'];
  children: (isActive: boolean) => React.ReactElement;
};

/* <ActiveLink />
============================================================================= */
const ActiveLink: React.FC<Props> = ({ href, children }) => {
  const { pathname } = useRouter();

  /* Check if current URL is equal to target URL */
  const isActive = pathname === href;

  return children(isActive);
};

export default ActiveLink;
