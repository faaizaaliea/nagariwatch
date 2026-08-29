import { useCallback, useEffect, useState } from "react";
import {
  buildSituationSummaryPayload,
  fetchSituationSummary,
  SituationSummaryError,
} from "../utils/situationSummary";
import { SITUATION_SUMMARY_ENDPOINT } from "../config/situationSummaryConfig";
import { useLanguage } from "../i18n/LanguageContext";
export function useSituationSummary(desa, reports, level) {
  const { lang } = useLanguage();
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus("idle");
    setData(null);
    setError(null);
  }, [desa?.id, lang]);

  const generate = useCallback(async () => {
    if (!desa) return;
    setStatus("loading");
    setError(null);
    try {
      const payload = buildSituationSummaryPayload(desa, reports, level, lang);
      const result = await fetchSituationSummary(
        payload,
        SITUATION_SUMMARY_ENDPOINT,
      );
      setData(result);
      setStatus("success");
    } catch (err) {
      const code = err instanceof SituationSummaryError ? err.code : "network";
      setError({ message: err.message, code });
      setStatus("error");
    }
  }, [desa, reports, level, lang]);

  return {
    status,
    data,
    error,
    generate,
    isConfigured: Boolean(SITUATION_SUMMARY_ENDPOINT),
  };
}
