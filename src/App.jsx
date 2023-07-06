import React, { useState } from 'react';
import './App.scss';
import Table from './components/Table/Table';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { UserFilterPanel } from './components/UserFilterPanel/UserFilterPanel';
import { Input } from './components/Input/Input';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

function getProducts(products, user, query) {
  const fixedQuery = query.toLowerCase();
  const filteredByQuery = products
    .filter(product => product.name.toLowerCase().includes(fixedQuery));

  if (user === 0) {
    return filteredByQuery;
  }

  return filteredByQuery.filter(product => product.user.id === user.id);
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [query, setQuery] = useState('');

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

  const preparedProducts = getProducts(products, selectedUser, query);

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

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
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
