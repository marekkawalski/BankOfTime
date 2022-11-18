import './CallTo.scss';

import { CallToProps } from './types';

export const CallTo = ({ phone, children }: CallToProps) => {
  return (
    <a className="link" href={`tel:${phone}`}>
      {children}
    </a>
  );
};
