export interface IMilitarCreateDTO {
  graduation: string;
  rg: number;
  name: string;
}

export interface IMilitarDTO extends IMilitarCreateDTO {
  id: string;
}
