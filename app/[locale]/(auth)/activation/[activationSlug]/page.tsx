import { activation } from "@/api/authApi";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function ActivationPage({
  params,
}: {
  params: Promise<{ activationSlug: string }>;
}) {
  const t = await getTranslations();
  const { activationSlug } = await params;
  const activated = await activation(activationSlug);

  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center gap-4">
      <h1>Account Activation</h1>

      {activated ? (
        <div className="alert alert-success" role="alert">
          {t("userIsActivated")}
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          {t("oopsWrong")}
        </div>
      )}

      <div className="d-flex gap-4">
        <Link href="/login" className="btn text-decoration-underline">
          {t("logIn")}
        </Link>
        <Link href="/registration" className="btn text-decoration-underline">
          {t("registration")}
        </Link>
      </div>
    </div>
  );
}
