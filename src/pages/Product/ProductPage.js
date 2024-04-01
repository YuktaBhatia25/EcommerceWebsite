import { useEffect, useState } from "react";
import { ProductCard } from "../../components";
import { FilterBar } from './components/FilterBar';
import { useDynamicTitle, useFetch } from "../../hooks";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../store/productSlice";

export const ProductPage = () => {
  useDynamicTitle("All Products | Purity Plants");
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q');
  const [showFilterBar, setShowFilterBar] = useState(false);
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.filteredProducts);

  const BASE_URL = process.env.REACT_APP_API_URL;
  
  const { setUrl } = useFetch(null, (products) => {
    dispatch(setProducts({ products }));
  });

  useEffect(() => {
    const searchURL = searchValue ? `products?name_like=${searchValue}` : 'products';
    setUrl(`${BASE_URL}${searchURL}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);
  
  return (
    <main>
      <section className="my-5">
        <div className="my-5 flex justify-between">
          <span className="text-2xl font-semibold dark:text-slate-100 mb-2">
            { products && <span>All Plants ({products.length})</span> }
          </span>
          <span>
            <button
              onClick={ () => setShowFilterBar(!showFilterBar) }
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700"
              type="button"
            >
              Filter
            </button>
          </span>
        </div>

        <div className="flex flex-wrap justify-start lg:flex-row">
          { products && products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      { showFilterBar && <FilterBar setShow={setShowFilterBar} /> }
    </main>
  );
};