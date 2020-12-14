import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PriceTable } from './PriceTable';
import { PriceLineChart } from './PriceLineChart';

import './App.css';

const API_URL = 'http://localhost:8080/';

export interface Item {
  item_name: string;
  rank: string;
  dpr3: string;
  dpr4: string;
  dpr5: string;
}

function App() {
  const [products, setProducts] = useState<Item[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Item>();
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>();

  const getProducts = () =>
    axios
      .get(API_URL)
      .then((response) => response.data.item)
      .then((data) => setProducts(data));

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setSelectedProduct(products[0]);
    setSelectedProductIndex(0);
  }, [products]);

  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const index = Number((e.target as HTMLElement).dataset.tabid);
    setSelectedProduct(products[index]);
    setSelectedProductIndex(index);
  };

  return (
    <div className="App">
      {products && <PriceTable items={products} selectedItemIndex={selectedProductIndex} onClick={handleOnClick} />}
      {selectedProduct && <PriceLineChart data={selectedProduct}/>}
    </div>
  );
}

export default App;
