import React from "react";

const SettingsProfile = () => {
  return (
    <main className="settings_right">
      <h2>Profile</h2>
      <div className="settings-content">
        <div className="profile-pic">
          <img src="avatar.jpg" alt="User Avatar" />
        </div>
        <form>
          <label>Your name:</label>
          <input type="text" defaultValue="John Doe" />
          <label>Your e-mail:</label>
          <input type="email" defaultValue="johndoe@gmail.com" />
          <label>Your e-mail for notifications:</label>
          <input type="email" defaultValue="johndoe@gmail.com" />
          <button type="submit" className="save-btn">
            Save
          </button>
        </form>
      </div>
    </main>
  );
};

export default SettingsProfile;
