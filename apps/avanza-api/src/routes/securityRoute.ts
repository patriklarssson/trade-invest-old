import { Router } from 'express';
import { getSecurityById } from '../controllers/securityController';

const securityRouter = Router();
securityRouter.get('/:securityId', getSecurityById)

export default securityRouter;
