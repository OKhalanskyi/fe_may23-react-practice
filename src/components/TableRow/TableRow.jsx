import React from 'react';
import cn from 'classnames';

export const TableRow = ({ product }) => {
  const userNameClass = cn({
    'has-text-link': product.user.sex === 'm',
    'has-text-danger': product.user.sex === 'f',
  });

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {product.id}
      </td>

      <td data-cy="ProductName">{product.name}</td>
      <td data-cy="ProductCategory">{`${product.icon} - ${product.category}`}</td>

      <td
        data-cy="ProductUser"
        className={userNameClass}
      >
        {product.user.name}
      </td>
    </tr>
  );
};
