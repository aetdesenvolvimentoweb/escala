export interface IVehicleCreateDTO {
  name: string;
}

export interface IVehicleDTO extends IVehicleCreateDTO {
  id: string;
}
