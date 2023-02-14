import {
  IGarrisonDTO,
  IMilitaryInGarrisonCreateDTO,
} from "@/dtos/IGarrisonDTO";
import {
  createGarrison,
  listGarrisonByVehicleAndMilitary,
} from "@/repositories/garrisonsRepository";
import { createMilitaryInGarrison } from "@/repositories/militaryInGarrisonRepository";
import { NextApiRequest, NextApiResponse } from "next";

interface IResponseData {
  success: boolean;
  garrison?: IGarrisonDTO;
  error?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) => {
  switch (req.method) {
    case "POST":
      try {
        console.log("dentro api garrison create");

        const { vehicleId, militaryInGarrison } = JSON.parse(req.body);

        if (!vehicleId || !militaryInGarrison) {
          throw new Error("Campos obrigatórios não foram preenchidos.");
        }

        let militaryIds: string[] = [];

        militaryInGarrison.map((m: IMilitaryInGarrisonCreateDTO) => {
          militaryIds = [...militaryIds, m.militaryId];
        });

        console.log("militaryIds", militaryIds);

        const garrisonAlreadyExist = await listGarrisonByVehicleAndMilitary(
          vehicleId,
          militaryIds
        );
        console.log("already", garrisonAlreadyExist);

        if (garrisonAlreadyExist) {
          throw new Error(
            "Já existe uma guarnição cadastrada com essa viatura ou algum desses militares."
          );
        }

        let militaryInGarrisonIds: string[] = [];
        await Promise.all(
          await militaryInGarrison.map(
            async (m: IMilitaryInGarrisonCreateDTO) => {
              const newMilitaryInGarrison = await createMilitaryInGarrison({
                militaryId: m.militaryId,
                scaleType: m.scaleType,
              });
              console.log("novo militar", newMilitaryInGarrison.id);
              militaryInGarrisonIds = [
                ...militaryInGarrisonIds,
                newMilitaryInGarrison.id,
              ];
              return militaryInGarrisonIds;
            }
          )
        );

        console.log("ids banco", militaryInGarrisonIds);

        const garrison = await createGarrison({
          vehicleId,
          militaryInGarrisonIds: militaryInGarrisonIds,
        });

        if (!garrison) {
          throw new Error("Erro ao cadastrar guarnição.");
        }

        res.status(201).json({ success: true, garrison });
      } catch (err: any) {
        res
          .status(400)
          .json({ success: false, error: "Erro interno no servidor." });
      }
      break;

    default:
      res.status(405).json({ success: false, error: "Método não suportado." });
      break;
  }
};

export default handler;
