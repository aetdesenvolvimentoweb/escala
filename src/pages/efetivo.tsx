import MainLayout from "@/components/layout/main";
import { ChangeEvent, FormEvent, useState } from "react";

const Efetivo = () => {
  const [graduation, setGraduation] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [edit, setEdit] = useState<boolean>(false);

  const handleCancel = () => {
    setGraduation("");
    setRg("");
    setName("");
    setPage(1);
    setEdit(false);
  };

  const handleChangePage = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(event.target.value))) {
      setPage(1);
    } else {
      setPage(parseInt(event.target.value));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <MainLayout title="Efetivo">
      <div className="mb-2">
        <div
          className={`${edit ? "hidden" : "flex"} items-center justify-between`}
        >
          <button
            className="px-4 py-1 font-bold text-white bg-green-600 rounded-md"
            onClick={() => setEdit(true)}
          >
            Novo
          </button>
          <div className="flex items-center p-1 border border-gray-800 rounded-md">
            <input className="px-2 focus:outline-none" type="text" />
            <button>S</button>
          </div>
        </div>
      </div>

      <div
        className={`${
          edit ? "flex" : "hidden"
        } items-center justify-between mb-2`}
      >
        <form
          className="p-2 text-sm border border-gray-800 rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center mb-2">
            <div className="pr-1">
              <label htmlFor="graduation">Posto/Graduação:</label>
            </div>
            <div className="flex-1">
              <select
                className="w-full p-1 border border-gray-800 rounded-md focus:outline-none"
                id="graduation"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setGraduation(event.target.value)
                }
                value={graduation}
              >
                <option value={""}>Selecione</option>
                <option value="Cel">Cel</option>
                <option value="TC">TC</option>
                <option value="Maj">Maj</option>
                <option value="Cap">Cap</option>
                <option value="1º Ten">1º Ten</option>
                <option value="2º Ten">2º Ten</option>
                <option value="Asp Of">Asp Of</option>
                <option value="Cad">Cad</option>
                <option value="CHOA">CHOA</option>
                <option value="ST">ST</option>
                <option value="1º">1º Sgt</option>
                <option value="2º">2º Sgt</option>
                <option value="3º">3º Sgt</option>
                <option value="Cb">Cb</option>
                <option value="Sd">Sd</option>
              </select>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="pr-1">
              <label htmlFor="rg">RG:</label>
            </div>
            <div className="flex-1">
              <input
                className="w-full p-1 border border-gray-800 rounded-md focus:outline-none"
                type="text"
                id="rg"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setRg(event.target.value)
                }
                value={rg}
              />
            </div>
          </div>
          <div className="flex items-center mb-6">
            <div className="pr-1">
              <label htmlFor="name">Nome de Guerra:</label>
            </div>
            <div className="flex-1">
              <input
                className="w-full p-1 border border-gray-800 rounded-md focus:outline-none"
                type="text"
                id="name"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
                value={name}
              />
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="w-1/2 px-6 py-2 mr-1 font-bold text-white bg-red-600 border border-gray-800 rounded-md mr1"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              className="w-1/2 px-6 py-2 font-bold text-white bg-green-600 border border-gray-800 rounded-md"
              type="submit"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>

      <div
        id="table"
        className={`${edit ? "hidden" : "flex"} flex-col mb-2 rounded-t-md`}
      >
        <div
          id="cabecalho"
          className="bg-gray-400 border border-gray-800 rounded-t-md"
        >
          <div id="linha" className="flex font-bold uppercase">
            <div className="w-2/3 px-2 py-1 border-r border-r-gray-800">
              Militar
            </div>
            <div className="w-1/3 px-2 py-1">ações</div>
          </div>
        </div>
        <div
          id="corpo"
          className="border-l border-r border-gray-800 rounded-b-md"
        >
          <div className="flex border-b border-gray-800 last:rounded-b-md">
            <div className="w-2/3 px-2 py-1 border-r border-r-gray-800">
              Maj 02.622 Dutra
            </div>
            <div className="w-1/3 px-2 py-1">ações</div>
          </div>
          <div className="flex border-b border-gray-800 last:rounded-b-md">
            <div className="w-2/3 px-2 py-1 border-r border-r-gray-800">
              Sd 03.917 Justo
            </div>
            <div className="w-1/3 px-2 py-1">ações</div>
          </div>
        </div>
      </div>

      <div
        id="paginacao"
        className={`${edit ? "hidden" : "flex"} items-center justify-center`}
      >
        <button>{"<<"}</button>
        <button className="px-2">{"<"}</button>
        <input
          className="w-10 text-center border border-gray-800 rounded-md focus:outline-none"
          type="text"
          onChange={handleChangePage}
          value={page.toString()}
        />
        <span className="pl-2">de</span>
        <span className="pl-2">3</span>
        <button className="pl-2">{">"}</button>
        <button className="pl-2">{">>"}</button>
      </div>
    </MainLayout>
  );
};

export default Efetivo;
