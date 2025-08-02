const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const { uuid } = req.query;
  if (!uuid) {
    return res.status(400).json({ status: 'bad', error: 'Missing params' });
  }

  const url = `https://turingmachine.info/api/api.php?uuid=${encodeURIComponent(uuid)}&m=0&d=1&n=5`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Origin': 'https://turingmachine.info',
        'Referer': 'https://turingmachine.info/'      }
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ status: 'bad', error: 'Request failed' });
  }
});

app.listen(3001, () => console.log('Proxy running on http://localhost:3001'));
