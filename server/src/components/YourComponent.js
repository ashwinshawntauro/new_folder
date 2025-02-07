import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const YourComponent = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Adjust based on where you store the token

        if (!token) {
            setError('No token found, redirecting to login.');
            history.push('/login'); // Redirect to login if no token
            return;
        }

        fetchUsers(token);
    }, [history]);

    const fetchUsers = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                setError('Unauthorized, redirecting to login.');
                history.push('/login'); // Redirect to login on 401
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('An error occurred while fetching users.');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default YourComponent;
