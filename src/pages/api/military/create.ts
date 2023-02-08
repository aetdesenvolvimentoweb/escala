import {
  createMilitary,
  listMilitaryByRG,
} from "@/repositories/militaryRepository";
import { NextApiRequest, NextApiResponse } from "next";

interface IResponseData {
  success: boolean;
  error?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) => {
  switch (req.method) {
    case "POST":
      try {
        const { graduation, rg, name } = JSON.parse(req.body);

        if (!graduation || !rg || !name) {
          throw new Error("Campos obrigatórios não foram preenchidos.");
        }

        const militaryAlreadyExist = await listMilitaryByRG(rg);

        if (militaryAlreadyExist) {
          throw new Error("Já existe um militar cadastrado com esse RG.");
        }

        const military = await createMilitary({ graduation, rg, name });

        if (!military) {
          throw new Error("Erro ao cadastrar militar.");
        }

        res.status(201).json({ success: true });
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
