import { useCallback, useEffect, useRef, useState } from "react";

const clampProgress = (value) => Math.max(0, Math.min(value, 100));

const useLoadingProgress = ({
  initialProgress = 8,
  pendingMax = 92,
  pendingRatioIncrement = 0.08,
  pendingMinIncrement = 0.25,
  pendingTickMs = 50,
  completeDurationMs = 1500,
  completeTickMs = 16,
} = {}) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const pendingIntervalRef = useRef(null);
  const completionIntervalRef = useRef(null);

  const setProgressValue = useCallback((valueOrUpdater) => {
    setProgress((prev) => {
      const nextValue = typeof valueOrUpdater === "function"
        ? valueOrUpdater(prev)
        : valueOrUpdater;

      const clampedValue = clampProgress(nextValue);
      progressRef.current = clampedValue;
      return clampedValue;
    });
  }, []);

  const clearPendingInterval = useCallback(() => {
    if (pendingIntervalRef.current) {
      clearInterval(pendingIntervalRef.current);
      pendingIntervalRef.current = null;
    }
  }, []);

  const clearCompletionInterval = useCallback(() => {
    if (completionIntervalRef.current) {
      clearInterval(completionIntervalRef.current);
      completionIntervalRef.current = null;
    }
  }, []);

  const progressStart = useCallback(() => {
    clearPendingInterval();
    clearCompletionInterval();

    setProgressValue(initialProgress);

    pendingIntervalRef.current = setInterval(() => {
      setProgressValue((prev) => {
        const remaining = pendingMax - prev;

        if (remaining <= 0) {
          return prev;
        }

        const increment = Math.max(
          remaining * pendingRatioIncrement,
          pendingMinIncrement,
        );

        return Math.min(prev + increment, pendingMax);
      });
    }, pendingTickMs);
  }, [
    clearCompletionInterval,
    clearPendingInterval,
    initialProgress,
    pendingMax,
    pendingMinIncrement,
    pendingRatioIncrement,
    pendingTickMs,
    setProgressValue,
  ]);

  const progressComplete = useCallback(() => new Promise((resolve) => {
    clearPendingInterval();
    clearCompletionInterval();

    if (completeDurationMs <= 0) {
      setProgressValue(100);
      resolve();
      return;
    }

    const startValue = progressRef.current;
    const startTime = Date.now();

    completionIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const normalizedProgress = Math.min(elapsed / completeDurationMs, 1);
      const easedProgress = 1 - Math.pow(1 - normalizedProgress, 2);
      const nextValue = startValue + (100 - startValue) * easedProgress;

      setProgressValue(nextValue);

      if (normalizedProgress >= 1) {
        clearCompletionInterval();
        setProgressValue(100);
        resolve();
      }
    }, completeTickMs);
  }), [
    clearCompletionInterval,
    clearPendingInterval,
    completeDurationMs,
    completeTickMs,
    setProgressValue,
  ]);

  const progressReset = useCallback(() => {
    clearPendingInterval();
    clearCompletionInterval();
    setProgressValue(0);
  }, [clearCompletionInterval, clearPendingInterval, setProgressValue]);

  useEffect(() => () => {
    clearPendingInterval();
    clearCompletionInterval();
  }, [clearCompletionInterval, clearPendingInterval]);

  return {
    progress,
    progressSet: setProgressValue,
    progressStart,
    progressComplete,
    progressReset,
  };
};

export default useLoadingProgress;
