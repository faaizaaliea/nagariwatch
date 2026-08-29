import { useCallback, useMemo, useState } from "react";
import { DEMO_STEPS } from "../demo/demoScenario";

export function useDemoScenario() {
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const start = useCallback(() => {
    setStepIndex(0);
    setActive(true);
  }, []);

  const exit = useCallback(() => {
    setActive(false);
    setStepIndex(0);
  }, []);

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, DEMO_STEPS.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  return useMemo(
    () => ({
      active,
      stepIndex,
      stepId: DEMO_STEPS[stepIndex],
      totalSteps: DEMO_STEPS.length,
      isFirstStep: stepIndex === 0,
      isLastStep: stepIndex === DEMO_STEPS.length - 1,
      start,
      exit,
      goNext,
      goPrev,
    }),
    [active, stepIndex, start, exit, goNext, goPrev],
  );
}
