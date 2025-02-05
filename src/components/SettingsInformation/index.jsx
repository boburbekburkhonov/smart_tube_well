import React from "react";
import './index.css'
import { useSelector } from "react-redux";

const SettingsInformations = () => {
  const { colors, theme } = useSelector((state) => state.theme);

  return (
    <main className="settings_right">
      <div class="settings_right_information_container">
        <h1 style={{color: colors.loginHeadingColor}}>About Smart Tube Well</h1>
        <p>
          <strong>Smart Tube Well</strong> is an innovative application designed
          to help farmers and water resource managers efficiently control and
          monitor their tube wells. The app provides real-time data, remote
          control functionality, and analytics to ensure optimal water usage.
        </p>

        <h2 style={{color: colors.loginHeadingColor}}>Key Features</h2>
        <ul>
          <li>Remote tube well control via smartphone</li>
          <li>Real-time water usage monitoring</li>
          <li>Automated scheduling and alerts</li>
          <li>Energy efficiency tracking</li>
          <li>Detailed analytics and reports</li>
        </ul>

        <h2 style={{color: colors.loginHeadingColor}}>Download the App</h2>
        <div class="settings_right_information_download_links" style={{borderLeft: `5px solid ${colors.loginHeadingColor}`}}>
          <p>Get the Smart Tube Well app on your mobile device:</p>
          <a
            href="https://play.google.com/store/apps/details?id=smarttubewell"
            target="_blank"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play Store"
              width={150}
              height={45}
            />
          </a>
          <a href="https://apps.apple.com/app/smarttubewell" target="_blank">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              width={150}
              height={45}
            />
          </a>
        </div>
      </div>
    </main>
  );
};

export default SettingsInformations;
