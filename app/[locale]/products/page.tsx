// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import CustomSelect from "@/components/CustomSelect";
import ProductCard from "@/components/ProductCard";
import "@/styles/_products.scss";

import products from "@/api/products.json";

export default async function ProductsPage() {
  const t = await getTranslations();

  const productTypes = [...new Set(products.map((product) => product.type))];

  return (
    <div className="products position-relative px-4 px-md-5 flex-grow-1">
      <div className="my-5 d-md-flex align-items-center">
        <h2 className="mb-3 me-4 mb-md-0 fw-bolder text-nowrap animate__animated animate__backInLeft animate__faster">
          {t("products")} 10 / 25
        </h2>

        <div className="d-sm-flex align-items-center flex-grow-1 animate__animated animate__backInRight animate__faster">
          <span className="me-2">{t("type")}:</span>
          <div className="flex-grow-1">
            <CustomSelect options={productTypes} />
          </div>
        </div>
      </div>

      <div className="products__list d-flex flex-column gap-3 overflow-scroll">
        {products.slice(0, 1).map((product) => (
          <ProductCard key={product.id} p={product} />
        ))}
      </div>
    </div>
  );
}
