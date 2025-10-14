import axios from "axios";

import { Issue } from "@/types/api/github";

const getProjectIssues = async (): Promise<Issue[]> => {
  try {
    const response = await axios.get(
      `${process.env.ENV_URL}/api/github/roadmap`,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch GitHub issues:", error);
    return []; // or throw error if you want
  }
};

export default getProjectIssues;
