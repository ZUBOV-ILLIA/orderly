"use client";

import Image from "next/image";
import "@/styles/_product-card.scss";
import { useTranslations } from "next-intl";
import CustomPopover from "@/components/CustomPopover";
import { formatDate } from "@/utils/helpers";
import { useLocale } from "next-intl";
import { Trash3Fill } from "react-bootstrap-icons";
import CustomModal from "@/components/CustomModal";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductCard({
  p,
  orderList,
}: {
  p: Product;
  orderList?: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleDeleteProduct() {
    toast.success(
      <div className="text-success">
        <span>The product</span>{" "}
        <p className="p-2 text-secondary">${p.title}</p>
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

  return (
    <div
      className={`prod-card px-4 d-flex align-items-center justify-content-between bg-white border${orderList ? "-top" : "rounded-2"}`}
    >
      <span className="prod-card__status-dot ms-2 me-3 position-relative bg-success rounded-circle"></span>
      <Image
        src={p.photo}
        className="ms-1 me-3"
        alt={p.title}
        height={70}
        width={70}
      />

      {/* name and serial number */}
      <div className="me-4 d-flex flex-column justify-content-center">
        <CustomPopover content={p.title} maxLength={75}>
          <p className="prod-card__name">{p.title}</p>
        </CustomPopover>
        <p className="text-secondary">{p.serialNumber}</p>
      </div>

      {/* status */}
      <span className="prod-card__status me-4 px-2 text-success text-center">
        Свободен
      </span>

      {/* guarantee */}
      {!orderList && (
        <>
          <div className="prod-card__guarantee me-4 pe-2 d-flex flex-column justify-content-center">
            <p className="d-flex justify-content-between gap-2">
              <span className="text-secondary">c</span>{" "}
              <span>{formatDate(p.guarantee.start)}</span>
            </p>
            <p className="d-flex justify-content-between gap-2">
              <span className="text-secondary">по</span>{" "}
              <span>{formatDate(p.guarantee.end)}</span>
            </p>
          </div>
          {/* is new or used */}
          <span className="prod-card__condition me-4 text-center">
            {t(p.isNew ? "new" : "used")}
          </span>

          {/* price */}
          <div className="prod-card__price pb-2 me-4 d-flex flex-column justify-content-center">
            {p.price.map((el, i) => (
              <span key={`${p.id}-${el.symbol}`}>
                {el.value} {i == 0 ? "$" : el.symbol}
              </span>
            ))}
          </div>

          {/* group */}
          <CustomPopover
            content={p.title} // imitation of huge group name
            maxLength={150} // if length will bigger, popover will run
          >
            <p className="prod-card__group me-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur harum iure laborum molestias obcaecati lorem
            </p>
          </CustomPopover>

          {/* manager */}
          <p className="prod-card__manager me-4 text-secondary">
            Lorem Ipsumovich Dolorov
          </p>

          {/* order */}
          <CustomPopover
            content={`${p.title}${p.title}`} // imitation of huge group name
            maxLength={150}
          >
            <p className="prod-card__group me-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur harum iure laborum molestias obcaecati lorem
            </p>
          </CustomPopover>

          {/* date */}
          <div className="prod-card__date me-3 d-flex flex-column justify-content-center align-items-center">
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

          <div className="mx-4 prod-card px-4 d-flex align-items-center bg-white">
            <span className="prod-card__status-dot ms-2 me-3 position-relative bg-success rounded-circle"></span>

            <Image
              src={p.photo}
              className="ms-1 me-3"
              alt={p.title}
              height={70}
              width={70}
            />

            {/* name and serial number */}
            <div className="me-4 d-flex flex-column justify-content-center">
              <CustomPopover content={p.title} maxLength={80}>
                <p className="prod-card__name">{p.title}</p>
              </CustomPopover>
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
