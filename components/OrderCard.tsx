"use client";

import "@/styles/_order-card.scss";
import { useTranslations } from "next-intl";
import { formatDate } from "@/utils/helpers";
import { useLocale } from "next-intl";
import { ChevronRight, ListUl, Trash3Fill } from "react-bootstrap-icons";
import CustomModal from "@/components/CustomModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { removeOrder } from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/strore";
import { deleteOrder, selectOrder } from "@/redux/slices/ordersSlice";

export default function OrderCard({ o }: { o: Order }) {
  const t = useTranslations();
  const locale = useLocale();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const activeOrder = useSelector(
    (state: RootState) => state.ordersSlice.selectedOrder
  );
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyDown() {
      window.onkeydown = (e: KeyboardEvent) => {
        if (e.key == "Escape") {
          dispatch(selectOrder(null));
        }
      };
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  async function handleDeleteOrder() {
    try {
      setPending(true);
      await removeOrder(o.id);

      dispatch(deleteOrder(o.id));

      toast.success(
        <div className="text-success">
          <span>{t("theOrder")}</span>{" "}
          <p className="p-2 text-secondary">${o.title}</p>
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
      setPending(false);
    }
  }

  function handleOpenModal(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();

    setModalIsOpen(true);
  }

  function handleSelectOrder() {
    dispatch(selectOrder(o));
  }

  return (
    <div
      className={`order-card border ${activeOrder ? "order-card--is-open" : ""} border animate__animated animate__bounceIn`}
      role="button"
      onClick={handleSelectOrder}
    >
      <div className="order-card__name-wrap">
        <p className="order-card__name">{o.title}</p>
      </div>

      <span
        className="order-card__menu-btn border"
        role="button"
        onClick={(e) => e.stopPropagation()}
      >
        <ListUl className="text-secondary" size={24} />
      </span>

      <div className="order-card__prod-quantity">
        <span>{o.productsCount}</span>
        <span>{t("productsWord")}</span>
      </div>

      <div className="order-card__date">
        <span className="order-card__date-short">
          {formatDate(o.date).slice(0, 7)}
        </span>
        <span className="text-nowrap">{formatDate(o.date, locale)}</span>
      </div>

      <div className="order-card__price">
        <span>{o.priceUAH ? o.priceUAH : 0} UAH</span>
        <span>{o.priceUSD ? o.priceUSD : 0} $</span>
      </div>

      <span
        className="order-card__delete btn"
        role="button"
        onClick={handleOpenModal}
      >
        <Trash3Fill className="text-secondary" size={24} />
      </span>

      {activeOrder?.id === o.id && (
        <div className="order-card__active-marker">
          <ChevronRight size={24} className="text-white" />
        </div>
      )}

      <CustomModal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <div>
          <h3 className="p-4 border-bottom">{t("sureToDeleteOrder")}</h3>

          <div className="order-card px-4 w-100 d-flex align-items-center rounded-0 bg-white">
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
              disabled={pending}
            >
              {pending && (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                />
              )}

              {!pending && <Trash3Fill className="text-danger" size={12} />}

              {t("delete")}
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
