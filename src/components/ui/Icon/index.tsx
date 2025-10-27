import { memo } from 'react';

import ClientSideIcon from './ClientSideIcon';

type Props = {
  src: string;
  className?: string;
};

const Wrapper = (props: Props): React.ReactElement => <ClientSideIcon {...props} />;

export default memo(Wrapper);
