import { JSX } from "react";

import * as Sentry from "@sentry/nextjs";
import { NextPageContext } from "next";
import Error, { ErrorProps } from "next/error";

type CustomErrorComponentProps = ErrorProps;

const CustomErrorComponent = ({ statusCode }: CustomErrorComponentProps): JSX.Element => {
  return <Error statusCode={statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext): Promise<ErrorProps> => {
  // Give Sentry time to log the error before function exit
  await Sentry.captureUnderscoreErrorException(contextData);

  return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;


