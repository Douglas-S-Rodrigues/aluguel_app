import React, { useEffect, useContext } from 'react'
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import ProductComp from '../components/ProductsComp';
import { Link } from 'react-router-dom';

export default function Products() {
  const { products, getProducts } = useContext(MyContext);

  useEffect(() => {
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <main>
        {products?.map((product, index) => (
          <div>
             <ProductComp
            key={ index }
            id={ product.id }
            index={ index }
            nameP={ product.name }
            urlImage={ product.urlImage }
            priceProd={ product.price.replace(('.', ',')) }
          />
          <Link to={`/product_details/${product.id}`}>
            <h3>VER PRODUTO</h3>
          </Link>
          </div>
        ))}
      </main>
    </div>
  )
}