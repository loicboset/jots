import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { ToggleEasyCronPayload } from "@/types/payload/easycron";

// TOGGLE CRON JOB
const toggleCronJob = async (payload: ToggleEasyCronPayload): Promise<void> => {
  const { easycronID, isActive } = payload;

  const { data } = await axios.patch("/api/easycron/toggle", {
    easycron_id: easycronID,
    status: isActive ? 1 : 0,
  });
  return data;
};

const useToggleCronJob = (): UseMutationResult<void, Error, ToggleEasyCronPayload, unknown> => {
  return useMutation({
    mutationFn: toggleCronJob,
  });
};

export { useToggleCronJob };
