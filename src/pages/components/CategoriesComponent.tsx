import React, { useState } from 'react';
import { TbTrash } from 'react-icons/tb';

const CategoriesComponent = () => {
  // Initial categories are Long, Short, and Trash
  const [categories, setCategories] = useState(['Long', 'Short', 'Trash']);
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  return (
    <div className='space-x-2'>
      <button className="btn btn-sm btn-neutral">
        All
      </button>

      {categories.map((category, index) => (
        <button key={index} className="btn btn-sm btn-neutral">
          {category}
          {category !== 'Trash' && <div className="badge">7</div>} {/* Adjust badge logic as needed */}
        </button>
      ))}

      <div>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="input input-sm input-bordered"
        />
        <button onClick={addCategory} className="btn btn-sm btn-success">
          Add
        </button>
      </div>

      {/* Example for a static category like Animals */}
      <button className="btn btn-sm btn-neutral">
        Animals
      </button>
    </div>
  );
};

export default CategoriesComponent;
