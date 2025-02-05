import React from "react";
import './index.css'
import { useSelector } from "react-redux";

const SettingsPrivacy = () => {
  const { colors, theme } = useSelector((state) => state.theme);

  return (
    <main className="settings_right">
      <div class="settings_right_privacy_container">
        <h1 style={{color: colors.loginHeadingColor}}>Privacy Policy</h1>
        <p>
          <strong>Last Updated:</strong> February 2025
        </p>

        <h2 style={{color: colors.loginHeadingColor}}>1. Collected Information</h2>
        <p>We may collect personal information such as:</p>
        <ul>
          <li>Name, email address, phone number</li>
          <li>Location data (if enabled)</li>
          <li>Usage statistics for improving our service</li>
          <li>Device information (browser type, operating system, etc.)</li>
          <li>IP address and cookies for analytics purposes</li>
        </ul>

        <h2 style={{color: colors.loginHeadingColor}}>2. How We Use Your Data</h2>
        <p>Your data is used for:</p>
        <ul>
          <li>Enhancing user experience</li>
          <li>Providing customer support</li>
          <li>Improving our services</li>
          <li>Ensuring security and fraud prevention</li>
          <li>Sending updates and notifications</li>
        </ul>

        <h2 style={{color: colors.loginHeadingColor}}>3. Data Sharing and Security</h2>
        <p>We do not sell or share your data with third parties, except:</p>
        <ul>
          <li>When required by law</li>
          <li>For service providers assisting in app operations</li>
          <li>With your explicit consent</li>
        </ul>
        <p>
          We implement security measures to protect your data from unauthorized
          access.
        </p>

        <h2 style={{color: colors.loginHeadingColor}}>4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to your data</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2 style={{color: colors.loginHeadingColor}}>5. Contact Us</h2>
        <div className="settings_right_privacy_contact" style={{borderLeft: `5px solid ${colors.loginHeadingColor}`}}>
          <p>If you have any questions, contact us:</p>
          <p>
            <strong>Email:</strong> support@smarttubewell.com
          </p>
          <p>
            <strong>Phone:</strong> +998 90 123 45 67
          </p>
          <p>
            <strong>Location:</strong> Tashkent, Uzbekistan
          </p>
        </div>
      </div>
    </main>
  );
};

export default SettingsPrivacy;
