import React from 'react'
import { ProductCard } from '../../../components/Elements/ProductCard'
import { useFetch } from '../../../hooks';

export const FeaturedProducts = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { data } = useFetch(`${BASE_URL}featured-products`);
  return (
    <div className="container mx-auto dark:text-white mb-16">
      <h2 className='text-4xl font-medium mb-4 text-center sectionTitle'>Featured Products</h2>
      <div className='flex flex-wrap justify-start'>
        { data && data.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}
