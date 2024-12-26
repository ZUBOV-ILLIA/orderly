// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import CustomSelect from "@/components/CustomSelect";

import products from "@/api/products.json";

export default async function ProductsPage() {
  const t = await getTranslations();

  const productTypes = [...new Set(products.map((product) => product.type))];

  return (
    <div className="flex-grow-1">
      <div className="my-5 mx-4 mx-md-5 d-md-flex align-items-center">
        <h2 className="mb-3 me-4 mb-md-0 fw-bolder text-nowrap animate__animated animate__backInLeft animate__faster">
          {t("products")} 10 / 25
        </h2>

        <div className="d-sm-flex align-items-center flex-grow-1 animate__animated animate__backInRight animate__faster">
          <span className="me-2">{t("type")}:</span>
          <div className="w-100">
            <CustomSelect options={productTypes} />
          </div>
        </div>
      </div>
    </div>
  );
}
