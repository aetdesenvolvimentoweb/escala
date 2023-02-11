import { IGarrisonCreateDTO } from "./IGarrisonDTO";
import { IServiceExchangeCreateDTO } from "./IServiceExchange";

export interface IForceMapCreateDTO {
  standbyOfficer: string;
  adjunct: string;
  garrisons: IGarrisonCreateDTO[];
  serviceExchanges: IServiceExchangeCreateDTO[];
}

export interface IForceMapDTO extends IForceMapCreateDTO {
  id: string;
}
