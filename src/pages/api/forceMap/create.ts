import { IForceMapDTO } from "@/dtos/IForceMapDTO";
import { NextApiRequest, NextApiResponse } from "next";

interface IResponseData {
  success: boolean;
  forceMap?: IForceMapDTO;
  error?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) => {
  switch (req.method) {
    case "POST":
      try {
        const { standbyOfficer, adjunct, garrisons, serviceExchanges } =
          JSON.parse(req.body);

        if (
          !standbyOfficer ||
          !adjunct ||
          garrisons.length < 0 ||
          !serviceExchanges
        ) {
          throw new Error("Campos obrigatórios não foram preenchidos.");
        }

        /* const forceMap = await createForceMap(req.body); */

        /* if (!forceMap) {
          throw new Error("Erro ao cadastrar mapa força.");
        } */

        res.status(201).json({ success: true }); //incluir mapa força na resposta
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
