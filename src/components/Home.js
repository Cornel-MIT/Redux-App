import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import { 
  fetchLists, 
  setCurrentList, 
  shareList, 
  createList, 
  deleteList,  
  updateList 
} from '../app/actions/shoppingListActions';
import { useNavigate } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import './Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { lists, currentList, loading, error } = useSelector(state => state.shoppingLists);
  const [newListName, setNewListName] = useState('');
  const [shareEmail, setShareEmail] = useState('');
  const [editListId, setEditListId] = useState(null); 
  const [editedListName, setEditedListName] = useState(''); 
  const [editedListImage, setEditedListImage] = useState(null); 

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const handleShare = (listId) => {
    dispatch(shareList(listId, shareEmail));
    setShareEmail('');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSelectList = (listId) => {
    dispatch(setCurrentList(listId));
  };

  const handleCreateList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      dispatch(createList(newListName.trim()));
      setNewListName('');
    }
  };

  const handleDeleteList = (listId) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      dispatch(deleteList(listId));
    }
  };

  const handleEditList = (listId, listName, listImage) => {
    setEditListId(listId); 
    setEditedListName(listName); 
    setEditedListImage(listImage); 
  };

  const handleUpdateList = (e) => {
    e.preventDefault();
    const updatedList = {
      name: editedListName.trim(),
      image: editedListImage,
    };
    if (updatedList.name) {
      dispatch(updateList(editListId, updatedList));
      setEditListId(null); 
      setEditedListName(''); 
      setEditedListImage(null); 
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedListImage(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <header>
        <h1 className='head-title'>Welcome, {user ? user.name : 'Guest'}!</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <main>
        <section className="lists-section">
          <h2 className='second-title'>Your Shopping Lists</h2>
          <form onSubmit={handleCreateList} className="create-list-form">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="New list name"
            />
            <button type="submit" className="button">
              <span className="left"></span>
                <span>Create New List</span>
              <span className="right"></span>
            </button>
          </form>

          <div className="lists-grid">
            {lists.map(list => (
              <div key={list.id} className="list-card">
                {editListId === list.id ? (
                  <form onSubmit={handleUpdateList} className="edit-list-form">
                    <input
                      type="text"
                      value={editedListName}
                      onChange={(e) => setEditedListName(e.target.value)}
                      placeholder="Edit list name"
                    />
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {editedListImage && (
                      <img src={editedListImage} alt="Preview" className="preview-image" />
                    )}
                    <button type="submit" className="save-btn">Save</button>
                    <button 
                      type="button" 
                      className="cancel-btn" 
                      onClick={() => setEditListId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <img 
                      src={list.image || "/default-list-image.jpg"} 
                      alt="List" 
                      className="list-image" 
                      onClick={() => handleSelectList(list.id)} 
                    />
                    <h3 
                    className='list-titles'
                    onClick={() => handleSelectList(list.id)}>{list.name}</h3>
                    <div className="list-actions">
                      <button 
                        onClick={() => handleEditList(list.id, list.name, list.image)} 
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteList(list.id)} 
                        className="delete-btn"
                      >
                        Delete
                      </button>
                      <input
                        type="email"
                        placeholder="Share with (email)"
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                      />
                      <button 
                        onClick={() => handleShare(list.id)} 
                        className="share-btn"
                      >
                        Share
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {currentList && (
          <section className="current-list-section">
            <ShoppingList list={currentList} />
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
