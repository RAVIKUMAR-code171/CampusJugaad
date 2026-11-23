const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const { data } = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: `You are a helpful assistant for CampusJugaad, a student marketplace in India where students can buy, sell and rent items like books, electronics, furniture etc.
Answer this student's question helpfully and concisely in 2-3 sentences max: ${message}`
      }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      }
    });

    const text = data.content[0].text;
    res.json({ reply: text });
  } catch (err) {
    console.error('chat error:', err);
    res.status(500).json({ message: 'chat failed' });
  }
});

module.exports = router;