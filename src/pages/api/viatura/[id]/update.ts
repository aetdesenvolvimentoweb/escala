import { updateVehicle } from "@/repositories/vehiclesRepository";
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
    case "PUT":
      try {
        const { name } = JSON.parse(req.body);
        const id = req.query.id as string;

        if (!id) {
          throw new Error("Identificador da viatura não encontrado.");
        }

        if (!name) {
          throw new Error("Campos obrigatórios não foram preenchidos.");
        }

        await updateVehicle(id, {
          name,
        });

        res.status(200).json({ success: true });
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
