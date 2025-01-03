"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "react-bootstrap-icons";
import OrderPageProductCard from "@/components/OrderPageProductCard";
import OrderCard from "@/components/OrderCard";
import { getOrderProducts, getOrders } from "@/api/api";
import "@/styles/_orders.scss";
import AddOrderModalBtn from "@/components/AddOrderModalBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/strore";
import { selectOrder, setOrders } from "@/redux/slices/ordersSlice";
import AddProductModalBtn from "@/components/AddProductModalBtn";

export default function OrdersPage() {
  const t = useTranslations();
  const [ordersPending, setOrdersPending] = useState(true);
  const [productsPending, setProductsPending] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null); // temp
  const orders = useSelector((state: RootState) => state.ordersSlice.orders);
  const activeOrder = useSelector(
    (state: RootState) => state.ordersSlice.selectedOrder
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectOrder(null));

    const fetchOrders = async () => {
      try {
        setOrdersPending(true);
        const data = await getOrders();

        if (data) {
          dispatch(setOrders(data));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setOrdersPending(false);
      }
    };

    fetchOrders();
  }, [dispatch]);

  useEffect(() => {
    if (!activeOrder) return;

    const fetchProducts = async () => {
      try {
        setProductsPending(true);
        setProducts(null);
        const data = await getOrderProducts(activeOrder.id);

        if (data) {
          setProducts(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setProductsPending(false);
      }
    };

    fetchProducts();
  }, [activeOrder?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page orders">
      <div className="d-md-flex align-items-center">
        <h2 className="d-flex align-items-center fw-bolder text-nowrap animate__animated animate__backInLeft animate__faster">
          <AddOrderModalBtn />
          {t("orders")}
          {!ordersPending && (
            <span className="ms-2">{orders ? orders.length : ""}</span>
          )}
        </h2>

        {ordersPending && (
          <div
            className="ms-2 spinner-border spinner-border-sm fw-normal"
            role="status"
          />
        )}
      </div>

      {!ordersPending && orders.length === 0 && (
        <h3 className="mt-5 pt-5 text-secondary orders__list">
          {t("ordersEmpty")}
        </h3>
      )}

      {orders.length > 0 && (
        <div className="orders__list animate__animated animate__bounceIn">
          <div className="d-flex flex-column gap-3">
            {orders.map((order) => (
              <OrderCard key={order.id} o={order} />
            ))}
          </div>

          {activeOrder && (
            <div className="orders__prod-side animate__animated animate__backInRight animate__faster">
              <div
                className="custom-modal__close position-absolute top-0 start-100 d-flex align-items-center justify-content-center bg-white rounded-circle shadow z-1"
                role="button"
                onClick={() => dispatch(selectOrder(null))}
              >
                <X className="text-secondary" size={20} />
              </div>

              <div className="w-100 position-relative border rounded-2 bg-white overflow-hidden">
                <div className="orders__prod-side-head">
                  <h3 className="mb-4">{activeOrder.title}</h3>
                  <AddProductModalBtn
                    products={products || []}
                    setProducts={setProducts}
                  />
                </div>

                {productsPending && (
                  <div className="d-flex align-items-center justify-content-center p-4">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />
                  </div>
                )}

                {products && (
                  <div className="orders__prod-list overflow-x-auto">
                    {products.map((product) => (
                      <OrderPageProductCard key={product.id} p={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
