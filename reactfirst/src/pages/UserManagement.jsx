import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('add');
  const [addUserForm, setAddUserForm] = useState({
    userName: '',
    userPassword: '',
    userRole: 'user'
  });
  const [deactivateForm, setDeactivateForm] = useState({
    userName: ''
  });
  const [updateForm, setUpdateForm] = useState({
    userName: '',
    userPassword: '',
    reEnterPassword: ''
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('user');
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('user');
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          userName: addUserForm.userName,
          userPassword: addUserForm.userPassword,
          userRole: addUserForm.userRole
        }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('User added successfully');
        setAddUserForm({ userName: '', userPassword: '', userRole: 'user' });
        fetchUsers();
      } else {
        setError(data.message || 'Failed to add user');
      }
    } catch (error) {
      setError('Failed to add user');
      console.error('Error:', error);
    }
  };

  const handleDeactivateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('user');
      const response = await fetch('http://localhost:5000/api/users/deactivate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ userName: deactivateForm.userName }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('User deactivated successfully');
        setDeactivateForm({ userName: '' });
        fetchUsers();
      } else {
        setError(data.message || 'Failed to deactivate user');
      }
    } catch (error) {
      setError('Failed to deactivate user');
      console.error('Error:', error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (updateForm.userPassword !== updateForm.reEnterPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem('user');
      const response = await fetch('http://localhost:5000/api/users/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          userName: updateForm.userName,
          userPassword: updateForm.userPassword
        }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Password updated successfully');
        setUpdateForm({ userName: '', userPassword: '', reEnterPassword: '' });
      } else {
        setError(data.message || 'Failed to update password');
      }
    } catch (error) {
      setError('Failed to update password');
      console.error('Error:', error);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <Navbar />
      <div className="user-management-container">
        <div className="user-management-content">
          <h2 className="user-management-title">User Management</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="user-management-tabs">
            <button 
              className={`user-tab-btn ${activeTab === 'add' ? 'active' : ''}`}
              onClick={() => setActiveTab('add')}
            >
              <FontAwesomeIcon icon={faUserPlus} className="user-tab-icon" />
              Add User
            </button>
            <button 
              className={`user-tab-btn ${activeTab === 'deactivate' ? 'active' : ''}`}
              onClick={() => setActiveTab('deactivate')}
            >
              <FontAwesomeIcon icon={faUserMinus} className="user-tab-icon" />
              Deactivate User
            </button>
            <button 
              className={`user-tab-btn ${activeTab === 'update' ? 'active' : ''}`}
              onClick={() => setActiveTab('update')}
            >
              <FontAwesomeIcon icon={faUserEdit} className="user-tab-icon" />
              Update User
            </button>
          </div>

          <div className="content-layout">
            <div className="form-section">
              <div className="user-tab-content">
                {activeTab === 'add' && (
                  <div className="user-add-content">
                    <h3>Add New User</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="userRole">User Level</label>
                        <select 
                          id="userRole" 
                          value={addUserForm.userRole}
                          onChange={(e) => setAddUserForm({...addUserForm, userRole: e.target.value})} 
                          required
                        >
                          <option value="user">User</option>
                          <option value="supervisor">Supervisor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input 
                          type="text" 
                          id="userName" 
                          value={addUserForm.userName}
                          onChange={(e) => setAddUserForm({...addUserForm, userName: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="userPassword">Password</label>
                        <input 
                          type="password" 
                          id="userPassword" 
                          value={addUserForm.userPassword}
                          onChange={(e) => setAddUserForm({...addUserForm, userPassword: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="submit-btn">Add User</button>
                        <button type="button" className="clear-btn" onClick={() => setAddUserForm({ userName: '', userPassword: '', userRole: 'user' })}>Clear</button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === 'deactivate' && (
                  <div className="user-deactivate-content">
                    <h3>Deactivate User</h3>
                    <form onSubmit={handleDeactivateUser}>
                      <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input 
                          type="text" 
                          id="userName" 
                          value={deactivateForm.userName}
                          onChange={(e) => setDeactivateForm({...deactivateForm, userName: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="submit-btn">Deactivate User</button>
                        <button type="button" className="clear-btn" onClick={() => setDeactivateForm({ userName: '' })}>Clear</button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === 'update' && (
                  <div className="user-update-content">
                    <h3>Update User Password</h3>
                    <form onSubmit={handleUpdateUser}>
                      <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input 
                          type="text" 
                          id="userName" 
                          value={updateForm.userName}
                          onChange={(e) => setUpdateForm({...updateForm, userName: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="userPassword">New Password</label>
                        <input 
                          type="password" 
                          id="userPassword" 
                          value={updateForm.userPassword}
                          onChange={(e) => setUpdateForm({...updateForm, userPassword: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="reEnterPassword">Re-enter Password</label>
                        <input 
                          type="password" 
                          id="reEnterPassword" 
                          value={updateForm.reEnterPassword}
                          onChange={(e) => setUpdateForm({...updateForm, reEnterPassword: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="submit-btn">Update Password</button>
                        <button type="button" className="clear-btn" onClick={() => setUpdateForm({ userName: '', userPassword: '', reEnterPassword: '' })}>Clear</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
            
            <div className="table-section">
              <div className="user-table-wrapper">
                <h3>Current Users</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.username}</td>
                          <td>{user.role}</td>
                          <td>{user.is_active ? 'Active' : 'Inactive'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center' }}>No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
