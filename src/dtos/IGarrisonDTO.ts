import { Military, Vehicle } from "@prisma/client";

export interface IGarrisonCreateDTO {
  vehicle: string;
  military: string[];
}

export interface IGarrisonDTO extends IGarrisonCreateDTO {
  id: string;
}
