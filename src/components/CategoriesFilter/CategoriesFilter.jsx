import React from 'react';
import cn from 'classnames';

export const CategoriesFilter = (
  { totalCategories,
    selectedCategories,
    onCategorySelected },
) => {
  const selectCategory = (categoryId) => {
    if (!selectedCategories.includes(categoryId)) {
      onCategorySelected([...selectedCategories, categoryId]);
    } else {
      onCategorySelected(selectedCategories.filter(cat => cat !== categoryId));
    }
  };

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={cn('button is-success mr-6', {
          'is-outlined': selectedCategories.length !== 0,
        })}
        onClick={() => onCategorySelected([])}
      >
        All
      </a>
      {
        totalCategories.map((category) => {
          const categoryLinkClassname = cn('button', 'mr-2', 'my-1',
            {
              'is-info': selectedCategories.includes(category.id),
            });

          return (
            <a
              data-cy="Category"
              className={categoryLinkClassname}
              href="#/"
              onClick={() => selectCategory(category.id)}
            >
              {category.title}
            </a>
          );
        })
      }
    </div>
  );
};
