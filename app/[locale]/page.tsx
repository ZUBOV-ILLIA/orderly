import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div>
      <h1 className="p-5">{t("title")}</h1>
    </div>
  );
}
