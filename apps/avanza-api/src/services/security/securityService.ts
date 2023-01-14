
import { InstrumentType } from '../../models/InstrumentType';
import { AvanzaService } from '../auth/avanzaService';

export class SecurityService {
  private avanza = AvanzaService.getInstance().avanza;

  getSecurityById = (securityId: string) => {
    return this.avanza
      .getInstrument(InstrumentType.STOCK, securityId)
      .then((res) => res);
  };
}
