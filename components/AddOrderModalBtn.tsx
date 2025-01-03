"use client";

import { Plus } from "react-bootstrap-icons";
import React, { useState } from "react";
import CustomModal from "@/components/CustomModal";
import { useTranslations } from "next-intl";
import { createOrder } from "@/api/api";
import { useDispatch } from "react-redux";
import { addOrder } from "@/redux/slices/ordersSlice";

export default function AddOrderModalBtn() {
  const t = useTranslations();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderTitle, setOrderTitle] = useState("");
  const [orderDescription, setOrderDescription] = useState("");
  const [pending, setPending] = useState(false);

  const dispatch = useDispatch();

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setPending(true);
      const order = await createOrder({
        title: orderTitle,
        description: orderDescription,
      });

      if (!order) return;

      handleCloseModal();
      setOrderTitle("");
      setOrderDescription("");

      dispatch(
        addOrder({ ...order, productsCount: 0, priceUAH: null, priceUSD: null })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <div
        className="orders__add-order-btn bg-success"
        role="button"
        onClick={() => setModalIsOpen(true)}
      >
        <Plus className="text-white" size={18} />
      </div>

      <CustomModal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <div>
          <h3 className="p-4 border-bottom">Добавить приход</h3>
          <form onSubmit={onSubmit}>
            <div className="orders__add-product-content d-flex flex-column gap-3 p-3">
              <input
                type="text"
                className="form-control rounded-0"
                placeholder={t("orderName")}
                value={orderTitle}
                onChange={(e) => setOrderTitle(e.target.value)}
                minLength={1}
                required
              />
              <textarea
                className="form-control rounded-0"
                placeholder={t("orderDescription")}
                value={orderDescription}
                onChange={(e) => setOrderDescription(e.target.value)}
              />
            </div>

            <div className="p-4 d-flex justify-content-end gap-2 bg-success">
              <button
                className="btn text-white rounded-5"
                onClick={handleCloseModal}
              >
                {t("cancel")}
              </button>
              <button
                className="btn px-4 d-flex align-items-center gap-2 bg-white text-success rounded-5 shadow"
                type="submit"
                disabled={pending}
              >
                {pending && (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                )}
                {t("addWord")}
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </>
  );
}
