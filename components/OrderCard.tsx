"use client";

import "@/styles/_order-card.scss";
import { useTranslations } from "next-intl";
import { formatDate } from "@/utils/helpers";
import { useLocale } from "next-intl";
import { ListUl, Trash3Fill } from "react-bootstrap-icons";
import CustomModal from "@/components/CustomModal";
import { useState } from "react";
import { toast } from "react-toastify";

export default function OrderCard({
  o,
  orderIsOpen,
  setOrderIsOpen,
}: {
  o: Order;
  orderIsOpen: boolean;
  setOrderIsOpen: (arg: boolean) => void;
}) {
  const t = useTranslations();
  const locale = useLocale();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleDeleteOrder() {
    toast.success(
      <div className="text-success">
        <span>The order</span> <p className="p-2 text-secondary">${o.title}</p>
        <span>has been deleted!</span>
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

    handleCloseModal();
  }

  function handleOpenModal(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();

    setModalIsOpen(true);
  }

  return (
    <div
      className={`order-card ${orderIsOpen ? "order-card--is-open" : ""} px-4 d-flex align-items-center bg-white border rounded-2`}
      role="button"
      onClick={() => setOrderIsOpen(true)}
    >
      {/* name */}
      <div className="pe-3 d-flex align-items-center flex-grow-1">
        <p className="order-card__name">{o.title}</p>
      </div>

      <span
        className="order-card__menu-btn me-4 d-flex align-items-center justify-content-center flex-shrink-0 border rounded-circle"
        role="button"
      >
        <ListUl className="text-secondary" size={24} />
      </span>

      {/* quantity */}
      <div className="order-card__prod-quantity me-4 d-flex flex-column justify-content-center flex-shrink-0">
        <span>23</span>
        <span>Продукта</span>
      </div>

      {/* date */}
      <div className="order-card__date me-4 d-flex flex-column justify-content-center align-items-center flex-shrink-0">
        <span className="order-card__date-short align-self-center">
          {formatDate(o.date).slice(0, 7)}
        </span>
        <span className="lh-1 text-nowrap">{formatDate(o.date, locale)}</span>
      </div>

      {/* price */}
      <div className="order-card__price pb-2 d-flex flex-column justify-content-center flex-shrink-0">
        {o.price.map((el, i) => (
          <span key={`${o.id}-${el.symbol}`} className="text-nowrap">
            {el.value} {i == 0 ? "$" : el.symbol}
          </span>
        ))}
      </div>

      <span
        className="order-card__delete btn flex-shrink-0"
        role="button"
        onClick={handleOpenModal}
      >
        <Trash3Fill className="text-secondary" size={24} />
      </span>

      <CustomModal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <div>
          <h3 className="p-4 border-bottom">{t("sureToDeleteProduct")}</h3>

          <div className="mx-4 order-card px-4 d-flex align-items-center bg-white">
            {/* name */}
            <p className="order-card__name me-4 d-flex align-items-center justify-content-center">
              {o.title}
            </p>
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
              onClick={handleDeleteOrder}
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
