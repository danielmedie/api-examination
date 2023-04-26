import express, { Request, Response } from 'express';
import exphbs from 'express-handlebars';
import fetch from 'node-fetch';

const app = express();

app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main'
}));
const port = 8008;

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.render('layouts/main')
});

app.get('/computers', async (req: Request, res: Response) => {
  try {
    const response = await fetch('http://localhost:1337/computers');
    const computers = await response.json();
    res.render('computers-list', { computers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/computers/:id', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`http://localhost:1337/computers/${req.params.id}`);
    const computer = await response.json();
    res.render('computer-details', { computer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/computers', async (req: Request, res: Response) => {
  try {
    const response = await fetch('http://localhost:1337/computers', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const computer = await response.json();
    res.json(computer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.put('/computers/:id', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`http://localhost:1337/computers/${req.params.id}`, {
      method: 'PUT',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const computer = await response.json();
    res.json(computer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.delete('/computers/:id', async (req, res) => {
  try {
    const response = await fetch(`http://localhost:1337/computers/${req.params.id}`, {
      method: 'DELETE'
    });
    const computer = await response.json();
    res.json(computer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
