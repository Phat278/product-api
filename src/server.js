require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Product API đang chạy');
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Đã kết nối MongoDB');

        app.listen(PORT, () => {
            console.log(`Server đang chạy tại http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Lỗi kết nối MongoDB:', error.message);
        process.exit(1);
    });