'use client';

import { useEffect } from "react";

import dayjs from "dayjs";

import { useCreateDigest, useGetDigestByDate } from "@/services/digests";

const CreatePeriodDigestPlugin = (): null => {
  // RQ
  const { mutate: createDigest } = useCreateDigest();
  const { data, isLoading } = useGetDigestByDate(dayjs().format("YYYY-MM-DD"), dayjs().day() === 1);

  // EFFECTS
  useEffect(() => {
    console.log('CreatePeriodDigestPlugin', { isLoading, data });
    if (isLoading || data) return;

    const isMonday = dayjs().day() === 1;
    const formattedDate = dayjs().format("YYYY-MM-DD");

    if (isMonday) createDigest({ date: formattedDate });

  }, [createDigest, isLoading, data]);

  return null;
};

export default CreatePeriodDigestPlugin;
