import { useRef, useState } from "react";
import CustomSelect from "./CustomSelect";
import {
  REPORT_STATUS,
  REPORT_CATEGORIES,
  getNextReportStatus,
} from "../utils/reportLogic";
import { useLanguage } from "../i18n/LanguageContext";

export default function CommunityReport({
  desaList,
  reports = [],
  onAddReport,
  onUpdateStatus,
}) {
  const { t, locale } = useLanguage();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState(desaList[0]?.nama ?? "");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [mediaName, setMediaName] = useState("");
  const [gps, setGps] = useState({
    status: "idle",
    lat: null,
    lng: null,
    accuracy: null,
  });
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  function handleMediaChange(e) {
    const file = e.target.files?.[0];
    if (!file) {
      setMedia(null);
      setMediaType(null);
      setMediaName("");
      return;
    }
    setMediaName(file.name);
    setMediaType(file.type.startsWith("video") ? "video" : "image");
    const reader = new FileReader();
    reader.onload = () => setMedia(reader.result);
    reader.readAsDataURL(file);
  }

  function handleRemoveMedia() {
    setMedia(null);
    setMediaType(null);
    setMediaName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleCaptureGps() {
    if (!navigator.geolocation) {
      setGps({ status: "unsupported", lat: null, lng: null, accuracy: null });
      return;
    }
    setGps((g) => ({ ...g, status: "loading" }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          status: "done",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
        });
      },
      () => setGps({ status: "denied", lat: null, lng: null, accuracy: null }),
      { timeout: 8000 },
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!category || !location || !description.trim()) {
      setError(t("communityReport.errorRequired"));
      return;
    }
    setError("");

    const newReport = {
      id: Date.now(),
      category,
      location,
      description: description.trim(),
      mediaData: media,
      mediaType,
      mediaName,
      gps:
        gps.status === "done"
          ? { lat: gps.lat, lng: gps.lng, accuracy: gps.accuracy }
          : null,
      timestamp: new Date().toLocaleString(locale),
      status: REPORT_STATUS.PENDING,
    };
    onAddReport?.(newReport);

    setCategory("");
    setDescription("");
    handleRemoveMedia();
    setGps({ status: "idle", lat: null, lng: null, accuracy: null });
  }

  return (
    <div className="report-card">
      <h3>{t("communityReport.title")}</h3>
      <p className="report-subtitle">{t("communityReport.subtitle")}</p>

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="report-field">
          <span>{t("communityReport.categoryLabel")}</span>
          <div className="category-pills">
            {REPORT_CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                className={`category-pill ${category === cat ? "is-active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {t(`communityReport.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>

        <label className="report-field">
          <span>{t("communityReport.locationLabel")}</span>
          <CustomSelect
            value={location}
            onChange={setLocation}
            options={desaList.map((desa) => desa.nama)}
            placeholder={t("communityReport.locationPlaceholder")}
          />
        </label>

        <label className="report-field">
          <span>{t("communityReport.descriptionLabel")}</span>
          <textarea
            rows={3}
            placeholder={t("communityReport.descPlaceholder")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="report-field">
          <span>{t("communityReport.uploadLabel")}</span>
          <label className="photo-upload-frame" htmlFor="report-media-input">
            {media && mediaType === "image" && (
              <img src={media} alt={t("communityReport.previewAlt")} />
            )}
            {media && mediaType === "video" && (
              <video src={media} controls className="report-video-preview" />
            )}
            {!media && (
              <span className="photo-upload-placeholder">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="9" cy="11" r="2" />
                  <path d="m21 17-4.5-4.5-3 3L10 12l-7 7" />
                </svg>
                <span>{t("communityReport.uploadPlaceholder")}</span>
              </span>
            )}
          </label>
          <input
            ref={fileInputRef}
            id="report-media-input"
            type="file"
            accept="image/*,video/*"
            className="photo-upload-input"
            onChange={handleMediaChange}
          />
          {mediaName && (
            <div className="photo-upload-meta">
              <span className="photo-upload-filename">
                {mediaType === "video" ? "🎬" : "📎"} {mediaName}
              </span>
              <button
                type="button"
                className="photo-upload-remove"
                onClick={handleRemoveMedia}
              >
                {t("communityReport.remove")}
              </button>
            </div>
          )}
        </div>

        <div className="report-field">
          <span>{t("communityReport.gpsLabel")}</span>
          <div className="report-gps-row">
            <button
              type="button"
              className="report-gps-btn"
              onClick={handleCaptureGps}
            >
              <img className="icon-inline--sm" src="/location.png" alt="" />
              {gps.status === "loading"
                ? t("communityReport.gpsLoading")
                : t("communityReport.gpsButton")}
            </button>
            <span className="report-gps-value">
              {gps.status === "done" &&
                `${gps.lat.toFixed(5)}, ${gps.lng.toFixed(5)} (±${gps.accuracy} m)`}
              {gps.status === "denied" && t("communityReport.gpsDenied")}
              {gps.status === "unsupported" && t("communityReport.gpsUnsupported")}
              {gps.status === "idle" && t("communityReport.gpsIdle")}
            </span>
          </div>
        </div>

        {error && <p className="report-error">{error}</p>}

        <button type="submit" className="report-submit">
          {t("communityReport.submit")}
        </button>
      </form>

      {reports.length > 0 && (
        <div className="report-feed">
          <span className="report-feed-title">
            {t("communityReport.feedTitle", { count: reports.length })}
          </span>
          <p className="prototype-note">{t("communityReport.prototypeNote")}</p>
          {reports.map((r) => {
            const status = r.status ?? REPORT_STATUS.PENDING;
            const next = getNextReportStatus(status);
            return (
              <div className="report-feed-item" key={r.id}>
                {r.mediaData && r.mediaType === "image" && (
                  <img
                    src={r.mediaData}
                    alt={t("communityReport.photoAlt", { location: r.location })}
                    className="report-feed-thumb"
                  />
                )}
                {r.mediaData && r.mediaType === "video" && (
                  <video
                    src={r.mediaData}
                    className="report-feed-thumb"
                    muted
                  />
                )}
                <div className="report-feed-text">
                  <div className="report-feed-meta">
                    <strong>{r.location}</strong>
                    <span>{r.timestamp}</span>
                  </div>
                  {r.category && (
                    <span className="report-feed-category">
                      {t(`communityReport.categories.${r.category}`)}
                    </span>
                  )}
                  <p>{r.description}</p>
                  {r.gps && (
                    <span className="report-feed-gps">
                      📍 {r.gps.lat.toFixed(5)}, {r.gps.lng.toFixed(5)}
                    </span>
                  )}
                  <div className="report-feed-status-row">
                    <span className={`status-badge status-badge--${status}`}>
                      {t(`reportStatus.${status}`)}
                    </span>
                    {onUpdateStatus && next && (
                      <button
                        type="button"
                        className="report-feed-status-btn"
                        onClick={() => onUpdateStatus(r.id, next)}
                      >
                        {t("communityReport.markAs", {
                          status: t(`reportStatus.${next}`),
                        })}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
