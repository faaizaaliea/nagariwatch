import { ACTION_GUIDE_KEY } from "../utils/actionGuide";
import { useLanguage } from "../i18n/LanguageContext";

export default function ActionGuideCard({ level }) {
  const { t } = useLanguage();
  const key = ACTION_GUIDE_KEY[level] ?? "rendah";
  const steps = t(`actionGuide.${key}.steps`);
  const stepList = Array.isArray(steps) ? steps : [];

  return (
    <div className={`action-guide action-guide--${key}`}>
      <div className="action-guide-head">
        <span className={`badge badge--${key}`}>
          {t(`actionGuide.${key}.title`)}
        </span>
        <p className="action-guide-headline">
          {t(`actionGuide.${key}.headline`)}
        </p>
      </div>
      <span className="action-guide-label">{t("actionGuide.sectionLabel")}</span>
      <ul className="action-guide-list">
        {stepList.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
