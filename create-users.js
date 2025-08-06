const axios = require('axios');

const API_BASE = 'http://localhost:8080/api';

const users = [
    { name: 'John Doe', email: 'john@example.com', age: 30, phone: '+1-555-0101' },
    { name: 'Jane Smith', email: 'jane@example.com', age: 25, phone: '+1-555-0102' },
    { name: 'Bob Johnson', email: 'bob@example.com', age: 35, phone: '+1-555-0103' },
    { name: 'Alice Brown', email: 'alice@example.com', age: 28, phone: '+1-555-0104' },
    { name: 'Charlie Wilson', email: 'charlie@example.com', age: 32, phone: '+1-555-0105' },
    { name: 'Sarah Davis', email: 'sarah@example.com', age: 29, phone: '+1-555-0106' },
    { name: 'Mike Thompson', email: 'mike@example.com', age: 41, phone: '+1-555-0107' },
    { name: 'Lisa Garcia', email: 'lisa@example.com', age: 33, phone: '+1-555-0108' },
    { name: 'David Martinez', email: 'david@example.com', age: 27, phone: '+1-555-0109' },
    { name: 'Emma Rodriguez', email: 'emma@example.com', age: 31, phone: '+1-555-0110' }
];

async function createUsers() {
    console.log('Creating users...');
    
    for (const user of users) {
        try {
            const response = await axios.post(`${API_BASE}/users`, user);
            console.log(`✓ Created: ${user.name} (${user.email})`);
        } catch (error) {
            console.log(`✗ Failed: ${user.name} - ${error.response?.data?.message || error.message}`);
        }
    }
    
    console.log('\nDone!');
}

createUsers();