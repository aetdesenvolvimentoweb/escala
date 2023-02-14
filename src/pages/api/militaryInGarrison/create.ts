import { IMilitaryInGarrisonDTO } from "@/dtos/IGarrisonDTO";
import {
  createMilitaryInGarrison,
  listMilitaryInGarrisonByMilitaryId,
} from "@/repositories/militaryInGarrisonRepository";
import { NextApiRequest, NextApiResponse } from "next";

interface IResponseData {
  success: boolean;
  militaryInGarrison?: IMilitaryInGarrisonDTO;
  error?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) => {
  switch (req.method) {
    case "POST":
      try {
        const { militaryId, scaleType } = JSON.parse(req.body);

        if (!militaryId || !scaleType) {
          throw new Error("Campos obrigatórios não foram preenchidos.");
        }

        const militaryAlreadyExist = await listMilitaryInGarrisonByMilitaryId(
          militaryId
        );

        if (militaryAlreadyExist) {
          throw new Error(
            "Esse militar já está cadastrado em outra guarnição."
          );
        }

        const militaryInGarrison = await createMilitaryInGarrison({
          militaryId,
          scaleType,
        });

        if (!militaryInGarrison) {
          throw new Error("Erro ao cadastrar militar na guarnição.");
        }

        res.status(201).json({ success: true, militaryInGarrison });
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
