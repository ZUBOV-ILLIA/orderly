"use client";

import { useState } from "react";
import { login } from "@/api/authApi";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { validateEmail, validatePassword } from "@/utils/helpers";

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

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
        const res = await login({ email, password });

        if (!res.success && res.message === "User does not exist") {
          setEmailError("emailValidErr4");

          return;
        }

        if (res) {
          document.cookie = `customJWT=${res}; path=/; max-age=315360000;`;
        }

        router.push(`/products`);
      } catch (e) {
        console.error("Registration error:", e);
      }
    }
  };

  return (
    <div className="w-100 d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h1 className="text-center mb-4">{t("logIn")}</h1>

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
            {t("logIn")}
          </button>

          <div className="d-flex align-items-center justify-content-between">
            {t("dontHaveAccount")}
            <Link
              href="/registration"
              className="text-black text-decoration-underline"
            >
              {t("registration")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
