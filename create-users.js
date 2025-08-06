const axios = require('axios');

const API_BASE = 'http://localhost:8080/api';

const users = [
    { name: 'Alex Johnson', email: 'alex.j@newcompany.com', age: 26, phone: '+1-555-0201' },
    { name: 'Maria Lopez', email: 'maria.l@newcompany.com', age: 34, phone: '+1-555-0202' },
    { name: 'Ryan Chen', email: 'ryan.c@newcompany.com', age: 28, phone: '+1-555-0203' },
    { name: 'Sofia Anderson', email: 'sofia.a@newcompany.com', age: 31, phone: '+1-555-0204' },
    { name: 'James Wilson', email: 'james.w@newcompany.com', age: 39, phone: '+1-555-0205' }
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