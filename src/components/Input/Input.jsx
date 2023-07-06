import React from 'react';

export const Input = ({ value, onChange }) => (
  <div className="panel-block">
    <p className="control has-icons-left has-icons-right">
      <input
        data-cy="SearchField"
        type="text"
        className="input"
        placeholder="Search"
        value={value}
        onChange={event => onChange(event.target.value)}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
      {
        value !== '' && (
          <span className="icon is-right">
            <button
              data-cy="ClearButton"
              type="button"
              className="delete"
              onClick={() => onChange('')}
            />
          </span>
        )
      }
    </p>
  </div>
);
