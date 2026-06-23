const https = require('https');

exports.handler = async function(event, context) {
  const API_KEY = process.env.FOOTBALL_API_KEY || 'c59da080b24b4d82ba842f93986dcc47';

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.football-data.org',
      path: '/v4/competitions/WC/matches',
      method: 'GET',
      headers: {
        'X-Auth-Token': API_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: data
        });
      });
    });

    req.on('error', (e) => {
      resolve({
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: e.message })
      });
    });

    req.end();
  });
};
