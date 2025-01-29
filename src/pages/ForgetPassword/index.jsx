import React from "react";

const ForgetPassword = () => {
  const resetPassword = (e) => {
      e.preventDefault();

      const { username } = e.target;
      console.log(username.value);

      // dispatch(signInAction(data, lang));
      username.value = "";
    };

  return (
    <>
      <div className="sign_in_title">
        <h2>Parolni tiklash uchun usernamemingizni kiriting</h2>
      </div>
      <div className="form">
        <form onSubmit={resetPassword}>
          <div className="p-2 mt-3">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                name="username"
                type="text"
                id="username"
                className="form-control"
                placeholder="username"
                required
              />
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success login-btn">
              Parolni tiklash
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
