import bookRoute from './routes/bookRoute';
import bookshelfRoute from './routes/bookshelfRoute';
import genreRoute from './routes/genreRoute';
import planRoute from './routes/genreRoute222';
import userRoute from './routes/userRoute';
import uploadRoute from './routes/uploadRoute';

function privateRoute(req, res, next) {
  if (!req.user) {
    res.status(403).send('Unauthorized')
  } else {
    next()
  }
}

function sendManagerInfo(req, res) {
  res.json({
    manager: req.session.manager,
  })
}

export default function (app) {
  app.use('/book', bookRoute);
  app.use('/bookshelf', bookshelfRoute);
  app.use('/genre', genreRoute);
  // app.use('/plan', planRoute);
  app.use('/user', userRoute);
  app.use('/posts', uploadRoute);

  app.get('/manager1', (req, res) => {
    if (!req.session.manager) {
      res.send('null')
    } else {
      return sendManagerInfo(req, res)
    }
  })

  app.post('/managerLogin', (req, res, next) => {
    if (req.body.username === 'admin' && req.body.password === '123') {
      req.session.manager = true;
      res.json({
        manager: true
      })
    } else {
      res.json({
        manager: false
      })
    }
  })

  app.get('/managerLogout', (req, res, next) => {
    req.session.manager = null;
    res.json({
      status: 'ok'
    })
  })
}
