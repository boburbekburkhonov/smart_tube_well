import React from "react";
import "./index.css";
import Language from "../Language";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SettingsLanguage = () => {
  const { i18n, t } = useTranslation();
  const { colors, theme } = useSelector((state) => state.theme);

  return (
    <main className="settings_right">
      <div class="settings_right_language_container">
        <div class="language-switcher d-flex align-items-center justify-content-between">
          <h2>{t("settingNavbar.language.item2")}</h2>
          <div className="settings_right_language_container_select">
            <Language />
          </div>
        </div>

        <div class="settings_right_language_cards_container">
          <div
            class="card"
            style={{ background: colors.layoutBackground, color: colors.text }}
          >
            <h3 style={{ color: colors.text }}>
              {t("settingNavbar.language.item3")}
            </h3>
            <p style={{ color: colors.text }}>{t("settingNavbar.language.item4")}</p>
          </div>
          <div class="card" style={{ background: colors.layoutBackground, color: colors.text }}>
            <h3 style={{ color: colors.text }}>{t("settingNavbar.language.item5")}</h3>
            <ul>
              <li style={{ color: colors.text }}>{t("layoutData.oz")}</li>
              <li style={{ color: colors.text }}>{t("layoutData.rus")}</li>
              <li style={{ color: colors.text }}>{t("layoutData.eng")}</li>
            </ul>
          </div>
          <div class="card" style={{ background: colors.layoutBackground, color: colors.text }}>
            <h3 style={{ color: colors.text }}>{t("settingNavbar.language.item6")}</h3>
            <p style={{ color: colors.text }}>{t("settingNavbar.language.item7")}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsLanguage;
