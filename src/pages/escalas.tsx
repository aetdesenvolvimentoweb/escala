import MainLayout from "@/components/layout/main";
import { IMilitarDTO } from "@/dtos/IMilitarDTO";
import { ChangeEvent, useEffect, useState } from "react";
import { FiXCircle } from "react-icons/fi";

const DailyService = () => {
  const [type, setType] = useState<string>("");
  const [searched, setSearched] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [adding, setAdding] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const [oficial, setOficial] = useState<IMilitarDTO | null>();
  const [functionMilitary, setFunctionMilitary] = useState<string>("");
  const [efetivo, setEfetivo] = useState<IMilitarDTO[]>([] as IMilitarDTO[]);

  useEffect(() => {
    const loadEfetivo = async () => {
      const response = await fetch("/api/military/listAll", {
        method: "GET",
      }).then(async (res) => await res.json());

      setEfetivo(response.military);
    };

    loadEfetivo();
  }, []);

  return (
    <MainLayout title="Serviço de Dia">
      <div
        className={`${
          adding || editing || deleting ? "hidden" : "flex"
        } items-center justify-between mb-2`}
      >
        <button
          className="px-4 py-1 font-bold text-white bg-green-600 rounded-md"
          onClick={() => setAdding(true)}
        >
          Novo
        </button>
        <div className="flex items-center p-1 border border-gray-800 rounded-md">
          <input
            className="w-40 px-2 focus:outline-none"
            type="text"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearched(event.target.value)
            }
            value={searched}
          />
          <div className={`${searched ? "visible" : "invisible"} flex`}>
            <button className="text-red-600" onClick={() => setSearched("")}>
              <FiXCircle size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className={"flex items-center justify-between mb-2"}>
        <form className="p-2 text-sm border border-gray-800 rounded-md">
          <div className="flex items-center mb-2">
            <div className="pr-1">
              <label htmlFor="oficial">Oficial de Sobreaviso:</label>
            </div>
            <div className="flex-1">
              <select
                id="oficial"
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setFunctionMilitary(event.target.value)
                }
                value={functionMilitary}
              >
                <option value="">Selecione</option>
                {efetivo &&
                  efetivo.map((militar) => (
                    <option key={militar.id} value={militar.id}>
                      {militar.graduation} {militar.rg} {militar.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="pr-1">
              <label htmlFor="oficial">Adjunto:</label>
            </div>
            <div className="flex-1">
              <select
                id="oficial"
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setFunctionMilitary(event.target.value)
                }
                value={functionMilitary}
              >
                <option value="">Selecione</option>
                {efetivo &&
                  efetivo.map((militar) => (
                    <option key={militar.id} value={militar.id}>
                      {militar.graduation} {militar.rg} {militar.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default DailyService;
