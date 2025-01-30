"use client";

import { useState } from "react";
import { registration } from "@/api/authApi";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { validateEmail, validatePassword } from "@/utils/helpers";
import { RootState } from "@/redux/strore";
import { useSelector } from "react-redux";

export default function RegistrationPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const serverStatus = useSelector(
    (state: RootState) => state.serverStatusSlice.isServerOnline
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError) {
      setEmailError(emailValidationError);
    }

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    }

    if (!emailValidationError && !passwordValidationError) {
      try {
        const res = await registration({ email, password }, locale);

        if (res.success) {
          setStep(2);
          return;
        }

        if (!res.success && res.message === "User already exists") {
          setEmailError("emailValidErr3");
        }
      } catch (e) {
        console.error("Registration error:", e);
      }
    }
  };

  return (
    <div className="w-100 d-flex align-items-center justify-content-center">
      {!serverStatus && (
        <h2 style={{ width: "600px" }}>{t("waitUntilServerStart")}</h2>
      )}

      {serverStatus && step === 1 && (
        <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
          <h1 className="text-center mb-4">{t("registration")}</h1>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div>
              <label htmlFor="email" className="form-label">
                {t("emailAddress")}
              </label>
              <input
                type="email"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                id="email"
                placeholder={t("enterYourEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailError(null)}
              />
              {emailError && (
                <div className="invalid-feedback">{t(emailError)}</div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                {t("password")}
              </label>
              <input
                type={isPasswordHidden ? "password" : "text"}
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                id="password"
                placeholder={t("enterYourPassword")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordError(null)}
              />
              {passwordError && (
                <div className="invalid-feedback">{t(passwordError)}</div>
              )}
            </div>

            <div className="d-flex align-items-center justify-content-end gap-2">
              <label className="form-check-label" htmlFor="showPassword">
                {t("showPassword")}
              </label>
              <input
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                checked={!isPasswordHidden}
                onChange={() => setIsPasswordHidden(!isPasswordHidden)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {t("registration")}
            </button>

            <div className="d-flex align-items-center justify-content-between">
              {t("haveAccount")}
              <Link
                href="/login"
                className="text-black text-decoration-underline"
              >
                {t("logIn")}
              </Link>
            </div>
          </form>
        </div>
      )}

      {serverStatus && step === 2 && (
        <p className="alert alert-success">{t("checkYourAccount")}</p>
      )}
    </div>
  );
}
