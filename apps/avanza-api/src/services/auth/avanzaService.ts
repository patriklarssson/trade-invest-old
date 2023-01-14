import * as Avanza from 'avanza';

export class AvanzaService {
  private _avanza: Avanza;
  private static instance: AvanzaService;

  private constructor() {
    this._avanza = new Avanza();
  }

  get avanza(): Avanza {
    return this._avanza;
  }

  public static getInstance(): AvanzaService {
    if (!AvanzaService.instance) {
      AvanzaService.instance = new AvanzaService();
    }
    return AvanzaService.instance;
  }

  authenticate(): Promise<void> {
    if(this._avanza && !this._avanza._authenticated) {
        console.log("AUTHENTICATING");
        return this._avanza.authenticate({

        });
    }
    else {
        console.log("ALREADY AUTH");
        return Promise.resolve()
    }
  }
}
