// "use client";
import Image from "next/image";
import "@/styles/_product-card.scss";
import { getTranslations } from "next-intl/server";

// import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";

export default async function ProductCard({ p }: { p: Product }) {
  const t = await getTranslations();

  function formatDate(input: string): string {
    const [date] = input.split(" ");
    const [year, month, day] = date.split("-");

    return `${day} / ${month} / ${year}`;
  }

  return (
    <div className="prod-card px-4 d-flex align-items-center border rounded-2">
      <span className="prod-card__status-dot ms-2 me-3 position-relative bg-success rounded-circle"></span>
      <Image
        src={p.photo}
        className="ms-1 me-3"
        alt={p.title}
        height={70}
        width={70}
      />
      <div className="me-4 d-flex flex-column justify-content-center">
        <p className="prod-card__name">{p.title}</p>
        <p className="text-secondary">{p.serialNumber}</p>
      </div>

      <span className="me-4 px-2 text-success">Свободен</span>

      <div className="me-4 pe-2 d-flex flex-column justify-content-center">
        <p className="d-flex justify-content-between gap-2">
          <span className="text-secondary">c</span>{" "}
          <span>{formatDate(p.guarantee.start)}</span>
        </p>
        <p className="d-flex justify-content-between gap-2">
          <span className="text-secondary">по</span>{" "}
          <span>{formatDate(p.guarantee.end)}</span>
        </p>
      </div>

      <span className="me-5">{t(p.isNew ? "new" : "used")}</span>

      <div className="pb-4 d-flex flex-column justify-content-center">
        {p.price.map((el) => (
          <span key={`${p.id}-${el.symbol}`}>
            {el.value} {el.symbol}
          </span>
        ))}
      </div>
    </div>
  );
}
