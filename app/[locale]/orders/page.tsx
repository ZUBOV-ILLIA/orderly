"use client";

import { useTranslations } from "next-intl";
import OrderCard from "@/components/OrderCard";
import "@/styles/_orders.scss";

import orders from "@/api/orders.json";
import React, { useState } from "react";
import { Plus, X } from "react-bootstrap-icons";
import products from "@/api/products.json";
import ProductCard from "@/components/ProductCard";

export default function OrdersPage() {
  const t = useTranslations();
  const [orderIsOpen, setOrderIsOpen] = useState(false);

  return (
    <div className="orders py-5 px-4 px-md-5 flex-grow-1 overflow-hidden">
      <div className="d-md-flex align-items-center">
        <h2 className="me-4 d-flex fw-bolder text-nowrap animate__animated animate__backInLeft animate__faster">
          <div
            className="orders__add-order-btn me-3 position-relative d-flex align-items-center justify-content-center bg-success rounded-circle"
            role="button"
          >
            <Plus className="text-white" size={18} />
          </div>
          {t("orders")} 10 / 25
        </h2>
      </div>

      <div className="orders__list d-flex">
        <div className="d-flex flex-column gap-3">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              o={order}
              orderIsOpen={orderIsOpen}
              setOrderIsOpen={setOrderIsOpen}
            />
          ))}
        </div>

        {orderIsOpen && (
          <div className="orders__prod-side d-flex ps-3 flex-grow-1 animate__animated animate__backInRight animate__faster">
            <div
              className="custom-modal__close position-absolute top-0 start-100 d-flex align-items-center justify-content-center bg-white rounded-circle shadow z-1"
              role="button"
              onClick={() => setOrderIsOpen(false)}
            >
              <X className="text-secondary" size={20} />
            </div>

            <div className="p-4 h-100 position-relative border rounded-2 bg-white overflow-hidden">
              <h3 className="mb-4">
                Длинное предлинное длиннючее длинючее название прихода
              </h3>
              <div className="mb-3 d-flex align-items-center gap-2 text-success">
                <div
                  className="orders__add-product-btn d-flex align-items-center justify-content-center bg-success rounded-circle"
                  role="button"
                >
                  <Plus className="text-white" size={18} />
                </div>
                Добавить продукт
              </div>

              <div className="orders__prod-list d-flex flex-column">
                {products.slice(0, 10).map((product) => (
                  <ProductCard key={product.id} p={product} orderList />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
