import axios from 'axios';

const handleError = (error: unknown): string => {
  let errorMessage = 'Oops! Something went wrong!';
  if (axios.isAxiosError(error)) {
    const errResp = error.response;
    errorMessage = errResp?.data;
  } else {
    if (error instanceof Error) {
      errorMessage = error.message;
    }
  }

  return errorMessage;
};

export default handleError;
