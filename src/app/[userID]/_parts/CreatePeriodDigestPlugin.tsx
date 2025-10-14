"use client";

import { useEffect } from "react";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

import { useCreateDigest, useGetLatestDigestDate } from "@/services/digests";

const CreatePeriodDigestPlugin = (): null => {
  // RQ
  const { mutate: createDigest } = useCreateDigest();
  const { data: date, isLoading } = useGetLatestDigestDate();

  // EFFECTS
  useEffect(() => {
    if (isLoading) return;

    const shouldCreateDigest = date
      ? dayjs(date).isBefore(dayjs().startOf("isoWeek"))
      : true;

    const formattedDate = dayjs().format("YYYY-MM-DD");

    if (shouldCreateDigest) createDigest({ date: formattedDate });
  }, [createDigest, date, isLoading]);

  return null;
};

export default CreatePeriodDigestPlugin;
