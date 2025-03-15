// Sarkar-MD - YouTube Video Downloader API
import express from 'express';
import cors from 'cors';
import gifted from 'gifted-dls';

const giftedytmp4 = gifted.giftedytmp4;
const giftedytmp3 = gifted.giftedytmp3;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/ytmp4', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).json({ error: 'Please provide a YouTube URL' });

        let data = await giftedytmp4(url);
        if (!data || data.status !== 200 || !data.result) 
            return res.status(500).json({ error: 'Failed to fetch video' });

        res.json({
            title: data.result.title,
            thumbnail: data.result.thumbnail,
            download_url: data.result.download_url
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.get('/api/ytmp3', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).json({ error: 'Please provide a YouTube URL' });

        let data = await giftedytmp3(url);
        if (!data || data.status !== 200 || !data.result) 
            return res.status(500).json({ error: 'Failed to fetch audio' });

        res.json({
            title: data.result.title,
            thumbnail: data.result.thumbnail,
            download_url: data.result.download_url
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// POWERED BY BANDAHEALI
