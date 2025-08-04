const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

// API endpoint to calculate price
app.post('/api/calculate', (req, res) => {
    try {
        const { salary, days } = req.body;
        
        console.log('Calculating price');
        console.log('Salary:', salary);
        console.log('Days:', days);
        
        // Validate input
        if (!salary || !days || isNaN(salary) || isNaN(days)) {
            return res.status(400).json({ 
                error: 'Invalid input. Please provide valid numbers for salary and days.' 
            });
        }
        
        // Calculate the price
        const dailyRate = parseFloat(salary) / 365;
        let finalPrice = dailyRate * parseFloat(days);
        
        // Round to nearest 50 (you can change this logic)
        finalPrice = Math.round(finalPrice / 50) * 50;
        
        // Return the result
        res.json({ 
            success: true,
            price: finalPrice,
            formattedPrice: `$${finalPrice.toFixed(2)}`,
            dailyRate: dailyRate.toFixed(2)
        });
        
    } catch (error) {
        console.error('Error calculating price:', error);
        res.status(500).json({ 
            error: 'Server error while calculating price.' 
        });
    }
});

// 404 error handler - must be last
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Page Not Found</title>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light">
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card shadow">
                            <div class="card-body text-center">
                                <h1 class="card-title text-danger">404</h1>
                                <h2 class="card-subtitle mb-3 text-muted">Page Not Found</h2>
                                <p class="card-text">Sorry, the page you're looking for doesn't exist.</p>
                                <a href="/" class="btn btn-primary">Go Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/calculate-price`);
});