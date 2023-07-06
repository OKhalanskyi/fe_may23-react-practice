import React, { useState } from 'react';
import './App.scss';
import Table from './components/Table/Table';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { UserFilterPanel } from './components/UserFilterPanel/UserFilterPanel';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

function getProducts(products, user) {
  if (user === 0) {
    return products;
  }

  return products.filter(product => product.user.id === user.id);
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);

  const products = productsFromServer.map((product) => {
    const copyProduct = { ...product };
    const category
      = categoriesFromServer.find(cat => cat.id === product.categoryId);
    const user = usersFromServer.find(person => category.ownerId === person.id);

    copyProduct.category = category.title;
    copyProduct.icon = category.icon;
    copyProduct.user = user;

    return product;
  });

  const preparedProducts = getProducts(products, selectedUser);

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

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

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
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <Table products={preparedProducts} />
        </div>
      </div>
    </div>
  );
};
