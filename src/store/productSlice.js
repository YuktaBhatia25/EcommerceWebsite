import { createSlice } from "@reduxjs/toolkit";

function sort(products, filterSortBy) {
  if (filterSortBy === "low-to-high") {
    return products.sort((p1, p2) => Number(p1.price) - Number(p2.price));
  } else if (filterSortBy === "high-to-low") {
    return products.sort((p1, p2) => Number(p2.price) - Number(p1.price));
  }
  return products;
}

function bestSeller(products, filterBestSeller) {
  return filterBestSeller
    ? products.filter((product) => product.best_seller === true)
    : products;
}

function inStock(products, filterInStock) {
  return filterInStock
    ? products.filter((product) => product.in_stock === true)
    : products;
}

function rating(products, filterRating) {
  if (filterRating === "four-and-above") {
    return products.filter((product) => product.rating >= 4);
  }
  if (filterRating === "three-and-above") {
    return products.filter((product) => product.rating >= 3);
  }
  if (filterRating === "two-and-above") {
    return products.filter((product) => product.rating >= 2);
  }
  if (filterRating === "one-and-above") {
    return products.filter((product) => product.rating >= 1);
  }
  return products;
}

function filter(products, sortBy, filterRating, filterInStock, filterBestSeller) {
  return sort(rating(inStock(bestSeller(products, filterBestSeller), filterInStock), filterRating), sortBy);
}
const initialState = {
  products: [],
  filteredProducts: [],
  filterSortBy: null,
  filterRating: null,
  filterBestSeller: false,
  filterInStock: false
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: function(currentState, action) {
      return {
        ...currentState,
        products: action.payload.products,
        filteredProducts: action.payload.products
      };
    },

    setFilteredProducts: function(currentState, action) {
      return {
        ...currentState,
        filteredProducts: action.payload.filteredProducts
      };
    },

    setFilterSortBy: function(currentState, action) {
      const updatedFilteredProducts = filter([...currentState.products], action.payload.sortBy, currentState.filterRating, currentState.filterInStock, currentState.filterBestSeller);
      return {
        ...currentState,
        filterSortBy: action.payload.sortBy,
        filteredProducts: updatedFilteredProducts
      };
    },

    setFilterRating: function(currentState, action) {
      const updatedFilteredProducts = filter([...currentState.products], currentState.filterSortBy, action.payload.rating, currentState.filterInStock, currentState.filterBestSeller);
      return {
        ...currentState,
        filterRating: action.payload.rating,
        filteredProducts: updatedFilteredProducts
      };
    },

    setFilterInStock: function(currentState, action) {
      const updatedFilteredProducts = filter([...currentState.products], currentState.filterSortBy, currentState.filterRating, action.payload.inStock, currentState.filterBestSeller);
      return {
        ...currentState,
        filterInStock: action.payload.inStock,
        filteredProducts: updatedFilteredProducts
      };
    },

    setFilterBestSeller: function(currentState, action) {
      const updatedFilteredProducts = filter([...currentState.products], currentState.filterSortBy, currentState.filterRating, currentState.filterInStock, action.payload.bestSeller);
      return {
        ...currentState,
        filterBestSeller: action.payload.bestSeller,
        filteredProducts: updatedFilteredProducts
      };
    },

    clearFilter: function(currentState, action) {
      return {
        ...initialState,
        products: currentState.products,
        filteredProducts: currentState.products
      };
    },
  }
  
});

export const { setProducts, setFilteredProducts, setFilterSortBy, setFilterRating, setFilterInStock, setFilterBestSeller, clearFilter } = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;