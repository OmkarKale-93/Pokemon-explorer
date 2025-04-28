import React from 'react';

const TypeFilter = ({ types, selectedType, setSelectedType }) => {
  return (
    <div className="type-filter">
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;