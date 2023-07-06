import React, { useState } from 'react';
import './App.scss';
import Table from './components/Table/Table';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { UserFilterPanel } from './components/UserFilterPanel/UserFilterPanel';
import { Input } from './components/Input/Input';
import { CategoriesFilter } from
'./components/CategoriesFilter/CategoriesFilter';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

function getProducts(products, user, query, categories) {
  const fixedQuery = query.toLowerCase();
  const filteredByQuery = products
    .filter(product => product.name.toLowerCase().includes(fixedQuery));

  const filteredByCategories = categories.length === 0
    ? filteredByQuery
    : filteredByQuery
      .filter(product => categories.includes(product.categoryId));

  if (user === 0) {
    return filteredByCategories;
  }

  return filteredByCategories.filter(product => product.user.id === user.id);
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const products = productsFromServer.map((product) => {
    const copyProduct = { ...product };
    const category
      = categoriesFromServer.find(cat => cat.id === product.categoryId);
    const user = usersFromServer.find(person => category.ownerId === person.id);

    copyProduct.category = category.title;
    copyProduct.icon = category.icon;
    copyProduct.user = user;

    return copyProduct;
  });

  const preparedProducts
    = getProducts(products, selectedUser, query, selectedCategories);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserFilterPanel
              users={usersFromServer}
              selectedUserId={selectedUser.id}
              onSelectUser={setSelectedUser}
            />

            <Input value={query} onChange={setQuery} />

            <CategoriesFilter
              totalCategories={categoriesFromServer}
              selectedCategories={selectedCategories}
              onCategorySelected={setSelectedCategories}
            />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setQuery('');
                  setSelectedUser(0);
                  setSelectedCategories([]);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {
            preparedProducts.length === 0
              ? (
                <p data-cy="NoMatchingMessage">
                  No products matching selected criteria
                </p>
              )
              : (
                <Table products={preparedProducts} />
              )
          }
        </div>
      </div>
    </div>
  );
};
