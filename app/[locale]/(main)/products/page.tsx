"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getProducts, getProductTypes } from "@/api/api";
import CustomSelect from "@/components/CustomSelect";
import ProductCard from "@/components/ProductCard";
import "@/styles/_products.scss";

export default function ProductsPage() {
  const t = useTranslations();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [productsPending, setProductsPending] = useState(false);
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsPending(true);
        const data: Product[] = await getProducts(selectedValue);

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
  }, [selectedValue]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const data: string[] = await getProductTypes();

        if (data) {
          setProductTypes(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchProductTypes();
  }, []);

  return (
    <div className="page products">
      <div className="d-md-flex align-items-center">
        <h2 className="products__title mb-3 me-4 mb-md-0 fw-bolder text-nowrap animate__animated animate__backInLeft animate__faster">
          {t("products")}
          {!productsPending && (
            <span className="ms-2">{products ? products.length : ""}</span>
          )}
        </h2>
        {productsPending && (
          <div
            className=" me-4 spinner-border spinner-border-sm fw-normal"
            role="status"
          />
        )}

        {productTypes.length > 0 && (
          <div className="d-sm-flex align-items-center flex-grow-1 animate__animated animate__backInRight animate__faster">
            <span className="me-2">{t("type")}:</span>
            <div className="flex-grow-1">
              <CustomSelect
                options={productTypes}
                setSelectedValue={setSelectedValue}
                selectedValue={selectedValue}
              />
            </div>
          </div>
        )}
      </div>

      {productsPending && (
        <div className="mt-5 d-flex justify-content-center">
          <div
            className="mt-5 spinner-border spinner-border fw-normal"
            role="status"
          />
        </div>
      )}

      {!productsPending && products && (
        <div className="products__list d-flex flex-column gap-3 overflow-x-auto">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              p={product}
              products={products}
              setProducts={setProducts}
            />
          ))}
        </div>
      )}
    </div>
  );
}
