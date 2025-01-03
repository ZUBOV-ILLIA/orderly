"use client";

import { Plus } from "react-bootstrap-icons";
import React, { useState } from "react";
import CustomModal from "@/components/CustomModal";
import { useTranslations } from "next-intl";
import { addProduct } from "@/api/api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/strore";

export default function AddProductModalBtn({
  products,
  setProducts,
}: {
  products: Product[];
  setProducts: (val: Product[]) => void;
}) {
  const t = useTranslations();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [specification, setSpecification] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [serialNum, setSerialNum] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [pending, setPending] = useState(false);

  const activeOrder = useSelector(
    (state: RootState) => state.ordersSlice.selectedOrder
  );

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!activeOrder) return;

      setPending(true);
      const product = await addProduct(activeOrder.id, {
        title,
        serialNumber: +serialNum,
        isNew: isNew ? 1 : 0,
        orderTitle: activeOrder.title,
        type: productType,
        specification: specification,
        price: +price,
        photo: "",
      });

      if (!product) return;

      setProducts([...products, product]);
      handleCloseModal();
      setTitle("");
      setSpecification("");
      setProductType("");
      setPrice("");
      setSerialNum("");
      setIsNew(false);
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <div
        className=" d-flex align-items-center gap-2 text-success"
        role="button"
        onClick={() => setModalIsOpen(true)}
      >
        <div className="orders__add-product-btn bg-success">
          <Plus className="text-white" size={18} />
        </div>
        {t("addProduct")}
      </div>

      <CustomModal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <div>
          <h3 className="p-4 border-bottom">Добавить приход</h3>
          <form onSubmit={onSubmit}>
            <div className="orders__add-product-content d-flex flex-column gap-3 p-3">
              <div className="d-flex align-items-center gap-3">
                <input
                  type="text"
                  className="form-control rounded-0"
                  placeholder={t("productName")}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  minLength={1}
                  required
                />
                <div className="d-flex gap-2">
                  <label className="form-check-label text-nowrap">
                    {t("new")} ?
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input scale"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                  />
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                <input
                  type="text"
                  className="form-control rounded-0"
                  placeholder={t("productPrice")}
                  value={price}
                  onChange={(e) => {
                    if (!/^\d*$/.test(e.target.value)) return;

                    setPrice(e.target.value);
                  }}
                  required
                />

                <input
                  type="text"
                  className="form-control rounded-0"
                  placeholder={t("serialNumber")}
                  value={serialNum}
                  onChange={(e) => {
                    if (!/^\d*$/.test(e.target.value)) return;

                    setSerialNum(e.target.value);
                  }}
                  required
                />
              </div>
              <input
                type="text"
                className="form-control rounded-0"
                placeholder={t("productType")}
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                minLength={1}
                required
              />
              <textarea
                className="form-control rounded-0"
                placeholder={t("productSpecification")}
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
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
