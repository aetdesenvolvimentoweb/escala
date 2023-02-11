import { Military, Vehicle } from "@prisma/client";

export interface IGarrisonCreateDTO {
  militaryIds: string[];
  vehiclesIds: string[];
}

export interface IGarrisonDTO extends IGarrisonCreateDTO {
  id: string;
}
