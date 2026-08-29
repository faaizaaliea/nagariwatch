import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function ShareWarningButton({ title, text, className = "" }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <button
      type="button"
      className={`share-warning-btn ${className}`}
      onClick={handleShare}
    >
      <img className="icon-inline--sm" src="/share.png" alt="" />
      {copied ? t("shareWarning.copied") : t("shareWarning.button")}
    </button>
  );
}
