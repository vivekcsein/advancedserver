interface ProductsData {
  productsData: Array<ProductData>;
}

interface ProductData {
  id: number;
  name?: string;
  price?: string;
  desc?: string;
}
