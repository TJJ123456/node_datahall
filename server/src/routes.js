import genreRoute from './routes/genreRoute';
import userRoute from './routes/userRoute';
import uploadRoute from './routes/uploadRoute';
import dataRoute from './routes/dataRoute';
import orderRoute from './routes/orderRoute';


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
  app.use('/genre', genreRoute);
  // app.use('/plan', planRoute);
  app.use('/user', userRoute);
  app.use('/posts', uploadRoute);
  app.use('/data', dataRoute);
  app.use('/order', orderRoute);

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
