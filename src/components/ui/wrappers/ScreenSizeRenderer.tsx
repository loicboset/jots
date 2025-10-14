import MediaQuery from "react-responsive";

import { BREAKPOINTS } from "@/utils/constants";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type Props = {
  children: React.ReactNode;
  minWidth?: Breakpoint;
  maxWidth?: Breakpoint;
};

const ScreenSizeRenderer = ({
  children,
  minWidth,
  maxWidth,
}: Props): React.ReactElement | null => (
  <MediaQuery
    minWidth={minWidth ? BREAKPOINTS[minWidth] : undefined}
    maxWidth={maxWidth ? BREAKPOINTS[maxWidth] : undefined}
  >
    {children}
  </MediaQuery>
);

export default ScreenSizeRenderer;
