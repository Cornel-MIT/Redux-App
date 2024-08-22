import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, updateItem, deleteItem } from '../app/actions/shoppingListActions';

const ShoppingList = ({ list }) => {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, notes: '', category: '', image: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const handleAddItem = (e) => {
    e.preventDefault();
    dispatch(addItem(list.id, newItem));
    setNewItem({ name: '', quantity: 1, notes: '', category: '', image: '' });
  };

  const handleUpdateItem = (item) => {
    dispatch(updateItem(list.id, item));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem(list.id, itemId));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredItems = list.items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || item.category === filter)
  )
  .sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  const categories = ['all', ...new Set(list.items.map(item => item.category))];

  return (
    <div>
      <h3>{list.name}</h3>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Item name"
          required
        />
        <input
          type="number"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
          min="1"
        />
        <input
          type="text"
          value={newItem.notes}
          onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
          placeholder="Notes"
        />
        <input
          type="text"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          placeholder="Category"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {newItem.image && <img src={newItem.image} alt="Preview" style={{ width: '50px', height: '50px' }} />}
        <button type="submit">Add Item</button>
      </form>

      <div>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            {item.image && <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />}
            {item.name} (Quantity: {item.quantity})
            {item.notes && <span> - Notes: {item.notes}</span>}
            {item.category && <span> - Category: {item.category}</span>}
            <button onClick={() => handleUpdateItem({ ...item, quantity: item.quantity + 1 })}>+</button>
            <button onClick={() => handleUpdateItem({ ...item, quantity: Math.max(1, item.quantity - 1) })}>-</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;