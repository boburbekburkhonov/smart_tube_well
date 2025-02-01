import React, { useState } from "react";
import "./index.css";
import { useTranslation } from "react-i18next";

const languagesImage = {
  uz: {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Flag_of_Uzbekistan.png/1200px-Flag_of_Uzbekistan.png",
  },
  ru: {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/2560px-Flag_of_Russia.svg.png",
  },
  en: {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png",
  },
};

const Language = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <div className="header-select-wrapper d-flex align-items-center justify-content-between ms-4">
      <img
        width={40}
        src={languagesImage[lang]?.imageUrl}
        className="language-img"
        alt="Flag_of_Uzbekistan"
      />

      <select
        onChange={(e) => changeLanguage(e.target.value)}
        className="form-select header-nav-select ms-3"
        value={lang}
      >
        <option value="uz" className="header-nav-option">
          {t("layoutData.oz")}
        </option>
        <option value="ru" className="header-nav-option">
          {t("layoutData.rus")}
        </option>
        <option value="en" className="header-nav-select">
        {t("layoutData.eng")}
        </option>
      </select>
    </div>
  );
};

export default Language;
