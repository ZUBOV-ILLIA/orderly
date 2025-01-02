"use client";

import Image from "next/image";
import "@/styles/_product-card.scss";
import { useTranslations } from "next-intl";
import { Image as BImage, Trash3Fill } from "react-bootstrap-icons";
import CustomModal from "@/components/CustomModal";
import { useState } from "react";
import { toast } from "react-toastify";

export default function OrderPageProductCard({
  p,
}: {
  p: Product;
  orderList?: boolean;
}) {
  const t = useTranslations();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleDeleteProduct() {
    toast.success(
      <div className="text-success">
        <span>The product</span>{" "}
        <p className="p-2 text-secondary">${p.title}</p>
        <span>has been removed from --current-- order !</span>
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

  return (
    <div className="prod-card px-4 border-top">
      <span className="prod-card__status-dot ms-3 me-4 bg-success" />
      <div className="prod-card__img-wrap">
        {p.photo ? (
          <Image src={p.photo} alt={p.title} height={70} width={70} />
        ) : (
          <BImage size={40} className="flex-shrink-0 text-secondary" />
        )}
      </div>

      <div className="prod-card__name-wrap px-3" role="button">
        <p className="prod-card__name">{p.title}</p>
        <p className="text-secondary">{p.serialNumber}</p>
      </div>

      <span className="prod-card__status text-success">Свободен</span>

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
            <span className="prod-card__status-dot ms-2 me-3 position-relative bg-success rounded-circle" />

            <Image
              src={p.photo}
              className="ms-1 me-3"
              alt={p.title}
              height={70}
              width={70}
            />

            <div className="prod-card__name-wrap me-4">
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
