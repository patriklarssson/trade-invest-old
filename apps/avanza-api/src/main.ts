import * as express from 'express';
import securityRouter from './routes/securityRoute';
import { AvanzaService } from './services/auth/avanzaService';


const avanzaService = AvanzaService.getInstance();

const app = express();

function requireLogin(req, res, next) {
  avanzaService
    .authenticate()
    .then(() => next())
    .catch((e) => console.log(e));
}

app.all('/security/*', requireLogin, function (req, res, next) {
  next();
});

app.use('/security', securityRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
