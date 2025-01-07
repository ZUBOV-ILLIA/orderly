"use client";

import Image from "next/image";
import "@/styles/_product-card.scss";
import { useTranslations } from "next-intl";
import CustomPopover from "@/components/CustomPopover";
import { formatDate } from "@/utils/helpers";
import { useLocale } from "next-intl";
import { Image as BImage, Trash3Fill } from "react-bootstrap-icons";
import CustomModal from "@/components/CustomModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { removeProduct } from "@/api/api";

export default function ProductCard({
  p,
  products,
  setProducts,
  ordersPage = false,
}: {
  p: Product;
  products: Product[];
  setProducts: (val: Product[]) => void;
  ordersPage?: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  async function handleDeleteProduct() {
    try {
      await removeProduct(p.id);

      setProducts(products.filter((el) => el.id !== p.id));

      toast.success(
        <div className="text-success">
          <span>{t("theProduct")}</span>{" "}
          <p className="p-2 text-secondary">${p.title}</p>
          <span>{t("hasBeenDeleted")}!</span>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      handleCloseModal();
    }
  }

  return (
    <div className="prod-card">
      <span className="prod-card__status-dot bg-success" />
      <div className="prod-card__img-wrap">
        {p.photo ? (
          <Image
            src={p.photo}
            alt={p.title}
            height={68}
            width={70}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <BImage size={40} className="flex-shrink-0 text-secondary" />
        )}
      </div>

      <div className="prod-card__name-wrap" role="button">
        <CustomPopover content={p.title} maxLength={75}>
          <p className="prod-card__name">{p.title}</p>
        </CustomPopover>
        <p className="text-secondary">{p.serialNumber}</p>
      </div>

      {!ordersPage && (
        <div className="prod-card__guarantee">
          <p className="prod-card__guarantee-dates">
            <span className="text-secondary">c</span>{" "}
            <span>{formatDate(p.guarantee_start)}</span>
          </p>
          <p className="prod-card__guarantee-dates">
            <span className="text-secondary">по</span>{" "}
            <span>{formatDate(p.guarantee_end)}</span>
          </p>
        </div>
      )}

      <span
        className={`prod-card__condition text-center ${p.isNew ? "text-success" : ""}`}
      >
        {t(p.isNew ? "new" : "used")}
      </span>

      {!ordersPage && (
        <>
          <div className="prod-card__price">
            {p.prices.map((el, i) => (
              <span key={`${p.id}-${el.symbol}`}>
                {el.value} {i == 1 ? "$" : el.symbol}
              </span>
            ))}
          </div>

          <CustomPopover content={p.order.title} maxLength={150}>
            <p className="prod-card__order">{p.order.title}</p>
          </CustomPopover>

          <div className="prod-card__date">
            <span className="prod-card__date-short align-self-center">
              {formatDate(p.date).slice(0, 7)}
            </span>
            <span className="lh-1">{formatDate(p.date, locale)}</span>
          </div>
        </>
      )}

      <span
        className="prod-card__delete btn"
        role="button"
        onClick={() => setModalIsOpen(true)}
      >
        <Trash3Fill className="text-secondary" size={24} />
      </span>

      <CustomModal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <div>
          <h3 className="p-4 border-bottom">{t("sureToDeleteProduct")}</h3>

          <div className="prod-card px-4">
            <span className="prod-card__status-dot ms-2 me-3 position-relative bg-success rounded-circle"></span>

            <div className="prod-card__img-wrap">
              {p.photo ? (
                <Image
                  src={p.photo}
                  alt={p.title}
                  height={68}
                  width={70}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <BImage size={40} className="flex-shrink-0 text-secondary" />
              )}
            </div>

            <div className="prod-card__name-wrap">
              <p className="prod-card__name">{p.title}</p>
              <p className="text-secondary">{p.serialNumber}</p>
            </div>
          </div>

          <div className="p-4 d-flex justify-content-end gap-2 bg-success">
            <button
              className="btn text-white rounded-5"
              onClick={handleCloseModal}
            >
              {t("cancel")}
            </button>
            <button
              className="btn px-4 d-flex align-items-center gap-2 bg-white text-danger rounded-5 shadow"
              onClick={handleDeleteProduct}
            >
              <Trash3Fill className="text-danger" size={12} />
              {t("delete")}
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
