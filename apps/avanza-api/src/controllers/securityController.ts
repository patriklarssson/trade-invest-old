import { SecurityService } from '../services/security/securityService';

const securityService = new SecurityService();

export const getSecurityById = (req, res, next) => {
  const securityId = req.params.securityId;
  securityService.getSecurityById(securityId).then((security) => res.send(security));
};
