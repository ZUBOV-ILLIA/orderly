interface Guarantee {
  start: string;
  end: string;
}

interface Price {
  value: string;
  symbol: string;
  isDefault: number;
}

interface Product {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee_start: string;
  guarantee_end: string;
  orderTitle: string;
  date: string;
  prices: Price[];
}

interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  productsCount: number;
  priceUAH: string | null;
  priceUSD: string | null;
}
