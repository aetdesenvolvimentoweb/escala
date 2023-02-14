import { IServiceExchangeDTO } from "@/dtos/IServiceExchange";
import { createServiceExchange } from "@/repositories/serviceExchangesRepository";
import { NextApiRequest, NextApiResponse } from "next";

interface IResponseData {
  success: boolean;
  serviceExchange?: IServiceExchangeDTO;
  error?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) => {
  switch (req.method) {
    case "GET":
      try {
        const serviceExchange = await createServiceExchange({
          replacedId: "63e81e643a927429033ab52c",
          substituteId: "63e8223a3a927429033ab530",
          initial: new Date(Date.now()),
          final: new Date(Date.now()),
        });

        if (!serviceExchange) {
          throw new Error("Erro ao cadastrar viatura.");
        }

        res.status(201).json({ success: true, serviceExchange });
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
