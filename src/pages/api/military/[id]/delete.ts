import { NextApiRequest, NextApiResponse } from "next";

interface IResponseData {
  success: boolean;
  error?: string;
}

const handler = (req: NextApiRequest, res: NextApiResponse<IResponseData>) => {
  switch (req.method) {
    case "POST":
      try {
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
