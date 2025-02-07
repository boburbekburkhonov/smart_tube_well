import React from "react";
import imageProfile from "../../assets/profile.svg";
import './index.css'

const SettingsDeleteUser = () => {
  return (
    <main className="settings_right">
      <div className="settings_right_delete_user-page">
        <div className="settings_right_delete_user-container">
          <h1>Hisobni butunlay o‘chirish</h1>
          <p>Siz rostdan ham ushbu hisobni butunlay o‘chirmoqchimisiz?</p>

          <div className="settings_right_delete_user-profile">
            <img
              src={imageProfile}
              alt="imageProfile"
              className="settings_right_delete_user-avatar"
            />
            <div className="settings_right_delete_user-details">
              <h2>John Doe</h2>
              <p className="m-0">johndoe@example.com</p>
            </div>
          </div>

          <div className="settings_right_delete_user-info">
            <h3>Nima bo‘ladi?</h3>
            <p>Agar hisobingizni o‘chirsangiz:</p>
            <ul>
              <li>Barcha ma’lumotlaringiz **butunlay o‘chadi**.</li>
              <li>Qayta kirish **imkonsiz** bo‘ladi.</li>
              <li>O‘chirilgan ma’lumotlarni **tiklab bo‘lmaydi**.</li>
            </ul>
          </div>

          <div className="settings_right_delete_user-info">
            <h3>Alternativ variant?</h3>
            <p>
              Agar faqat vaqtincha chiqmoqchi bo‘lsangiz,{" "}
              <a href="logout.html">Hisobdan chiqish</a> sahifasiga o‘ting.
            </p>
          </div>

          <div className="settings_right_delete_user-buttons">
            <button
              className="settings_right_delete_user-delete"
            >
              Hisobni o‘chirish
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsDeleteUser;
