export interface IMilitaryCreateDTO {
  graduation: string;
  rg: number;
  name: string;
}

export interface IMilitaryDTO extends IMilitaryCreateDTO {
  id: string;
}
