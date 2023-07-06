import React from 'react';
import cn from 'classnames';

export const UserFilterPanel = ({ users, selectedUserId, onSelectUser }) => {
  const selectedUser = users.find(user => user.id === selectedUserId) || 0;
  const selectUser = (user) => {
    if (user.id !== selectedUser.id) {
      onSelectUser(user);
    }
  };

  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => onSelectUser(0)}
        className={cn({ 'is-active': selectedUser === 0 })}
      >
        All
      </a>

      {
        users.map(user => (
          <a
            key={user.id}
            data-cy="FilterUser"
            href={`#/${user.name}`}
            onClick={() => selectUser(user)}
            className={cn({ 'is-active': selectedUser.id === user.id })}
          >
            {user.name}
          </a>
        ))
      }
    </p>
  );
};
