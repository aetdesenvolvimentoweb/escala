export interface IServiceExchangeCreateDTO {
  replaced: string;
  substitute: string;
  initial: Date;
  final: Date;
}

export interface IServiceExchangeDTO extends IServiceExchangeCreateDTO {
  id: string;
}
