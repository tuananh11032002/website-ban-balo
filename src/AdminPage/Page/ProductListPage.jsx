import React from 'react';
import Admin from '../Admin';
import ProductList from '../Component/ProductList';

const ProductListPage = () => {
   return <Admin indexActive={2} Child={ProductList}></Admin>;
};

export default ProductListPage;
