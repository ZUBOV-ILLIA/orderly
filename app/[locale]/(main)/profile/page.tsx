"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { PersonCircle } from "react-bootstrap-icons";
import { CldUploadWidget } from "next-cloudinary";
import { validatePassword } from "@/utils/helpers";

export default function ProfilePage() {
  const t = useTranslations();
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [profileInfo, setProfileInfo] = useState({
    email: "",
    img: "",
  });

  useEffect(() => {}, []);

  function onChangeDeleteInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === t("deleteProfile").toUpperCase()) {
      setIsDeleteButtonDisabled(false);
    } else {
      setIsDeleteButtonDisabled(true);
    }
  }

  function changePassword() {
    const passwordValidationError = validatePassword(password);

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);

      return;
    }

    console.log("password", password);

    try {
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="page profile">
      <div className="d-md-flex align-items-center">
        <h2 className="mb-4 fw-bolder animate__animated animate__backInLeft animate__faster">
          {t("profileSettings")}
        </h2>
      </div>

      <div className="mb-4 d-flex">
        <div className="me-3 p-2 rounded-circle shadow-lg">
          {profileInfo.img ? (
            <Image
              src={profileInfo.img}
              className="rounded-circle"
              alt="user avatar"
              height={100}
              width={100}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <PersonCircle size={100} className="flex-shrink-0 text-secondary" />
          )}
        </div>

        <div className="w-100 d-flex flex-column justify-content-evenly">
          <p className="text-secondary">{profileInfo.email} email</p>
          <CldUploadWidget
            uploadPreset="orderly"
            onSuccess={(
              results: any // eslint-disable-line
            ) => {
              setProfileInfo({
                ...profileInfo,
                img: results.info?.url || "",
              });
            }}
          >
            {({ open }) => {
              return (
                <button
                  className="btn btn-outline-success btn-sm w-100 shadow"
                  onClick={() => open()}
                >
                  {t("changeAvatar")}
                </button>
              );
            }}
          </CldUploadWidget>

          <Link
            href="/login"
            className="btn btn-outline-danger btn-sm w-100 shadow"
            onClick={() => {
              document.cookie = `customJWT=; path=/; max-age=0;`;
            }}
          >
            {t("logout")}
          </Link>
        </div>
      </div>

      <div className="mb-4 p-3 border rounded-3 shadow">
        <input
          type="text"
          placeholder={t("newPassword")}
          className={`form-control rounded-2 shadow-sm ${passwordError ? "is-invalid" : ""}`}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onClick={() => setPasswordError(null)}
        />
        {passwordError && (
          <div className="invalid-feedback">{t(passwordError)}</div>
        )}

        <button
          className="btn mt-3 btn-outline-success btn-sm w-100 shadow"
          onClick={changePassword}
        >
          {t("changePassword")}
        </button>
      </div>

      <div className="p-3 border rounded-3 shadow">
        <p className="mb-3">
          <span className="me-2">{t("toDelete")}</span>
          <span className="text-danger text-uppercase">
            {t("deleteProfile")}
          </span>
        </p>

        <input
          type="text"
          className="form-control mb-4 rounded-2 shadow-sm"
          onChange={onChangeDeleteInput}
        />

        <button
          className="btn btn-danger btn-sm w-100 shadow"
          disabled={isDeleteButtonDisabled}
          onClick={() => {
            document.cookie = `customJWT=; path=/; max-age=0;`;
          }}
        >
          {t("deleteProfile")}
        </button>
      </div>
    </div>
  );
}
