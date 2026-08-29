import { useLanguage } from "../i18n/LanguageContext";
import { RISK_THRESHOLDS } from "../utils/riskLogic";
import {
  DEMO_RAIN_BEFORE,
  DEMO_RAIN_AFTER,
  DEMO_HOTSPOT_AFTER,
} from "../demo/demoScenario";

const STEP_VARS = {
  before: DEMO_RAIN_BEFORE,
  after: DEMO_RAIN_AFTER,
  threshold: RISK_THRESHOLDS.hujanTinggi,
  hotspot: DEMO_HOTSPOT_AFTER,
};

export default function DemoOverlay({
  desaName,
  currentStep,
  stepIndex,
  totalSteps,
  isFirstStep,
  isLastStep,
  onPrev,
  onNext,
  onExit,
  onViewExplanation,
}) {
  const { t } = useLanguage();

  return (
    <div className="demo-overlay" role="dialog" aria-label={t("demoScenario.bannerLabel")}>
      <div className="demo-overlay-progress">
        {DEMO_STEP_DOTS(totalSteps, stepIndex)}
      </div>

      <div className="demo-overlay-body">
        <span className="demo-overlay-counter">
          {t("demoScenario.stepCounter", {
            current: stepIndex + 1,
            total: totalSteps,
          })}
        </span>
        <h4 className="demo-overlay-title">
          {t(`demoScenario.steps.${currentStep.id}.title`, {
            desa: desaName,
            ...STEP_VARS,
          })}
        </h4>
        <p className="demo-overlay-desc">
          {t(`demoScenario.steps.${currentStep.id}.desc`, {
            desa: desaName,
            ...STEP_VARS,
          })}
        </p>
      </div>

      <div className="demo-overlay-actions">
        {currentStep.autoOpenExplain && (
          <button
            type="button"
            className="demo-overlay-btn demo-overlay-btn--accent"
            onClick={onViewExplanation}
          >
            {t("demoScenario.viewExplanationButton")}
          </button>
        )}

        <div className="demo-overlay-nav">
          <button
            type="button"
            className="demo-overlay-btn"
            onClick={onPrev}
            disabled={isFirstStep}
          >
            {t("demoScenario.prevButton")}
          </button>

          {isLastStep ? (
            <button
              type="button"
              className="demo-overlay-btn demo-overlay-btn--primary"
              onClick={onExit}
            >
              {t("demoScenario.finishButton")}
            </button>
          ) : (
            <button
              type="button"
              className="demo-overlay-btn demo-overlay-btn--primary"
              onClick={onNext}
            >
              {t("demoScenario.nextButton")}
            </button>
          )}

          <button
            type="button"
            className="demo-overlay-btn demo-overlay-btn--ghost"
            onClick={onExit}
          >
            {t("demoScenario.exitButton")}
          </button>
        </div>
      </div>
    </div>
  );
}

function DEMO_STEP_DOTS(total, activeIndex) {
  return Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className={`demo-overlay-dot ${i === activeIndex ? "is-active" : ""} ${
        i < activeIndex ? "is-done" : ""
      }`}
    />
  ));
}
