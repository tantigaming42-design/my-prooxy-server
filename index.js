const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors()); // Buka semua akses agar website Anda bisa masuk
app.use(express.json());

// Ini jalur rahasia kita ke Cobalt
app.post('/process', async (req, res) => {
    try {
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: req.body.url,
                vQuality: 'max', // Paksa kualitas tertinggi
                filenamePattern: 'basic'
            })
        });

        const data = await response.json();
        res.json(data); // Kirim hasil bersih ke Frontend Anda

    } catch (error) {
        res.status(500).json({ error: 'Gagal menghubungi Cobalt' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
