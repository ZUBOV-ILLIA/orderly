interface Guarantee {
  start: string;
  end: string;
}

interface Price {
  value: number;
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
  guarantee: Guarantee;
  price: Price[];
  order: number;
  date: string;
}

interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  price: Price[];
}
