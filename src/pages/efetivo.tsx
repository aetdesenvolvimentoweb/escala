import MainLayout from "@/components/layout/main";
import { IMilitaryDTO } from "@/dtos/IMilitaryDTO";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiEdit2,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import { toast } from "react-toastify";

const Efetivo = () => {
  const [id, setId] = useState<string>("");
  const [graduation, setGraduation] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [military, setMilitary] = useState<IMilitaryDTO[]>(
    [] as IMilitaryDTO[]
  );

  const [searched, setSearched] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [adding, setAdding] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetch("/api/military/listAll", { method: "GET" }).then(
        async (res) => res.json()
      );
      console.log(data);
      setMilitary(data.military);
    };

    loadData();
  }, []);

  const handleCancel = () => {
    setId("");
    setGraduation("");
    setRg("");
    setName("");
    setPage(1);
    setAdding(false);
    setEditing(false);
    setDeleting(false);
  };

  const handleEdit = (military: IMilitaryDTO) => {
    setEditing(true);
    setId(military.id);
    setGraduation(military.graduation);
    setRg(military.rg.toString());
    setName(military.name);
  };

  const handleDeleting = (id: string) => {
    setId(id);
    setDeleting(true);
  };

  const handleChangePage = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(event.target.value))) {
      setPage(1);
    } else {
      setPage(parseInt(event.target.value));
    }
  };

  const handleDeleteMilitary = async () => {
    const response = await fetch(`/api/military/${id}/delete`, {
      method: "DELETE",
    }).then(async (res) => await res.json());

    if (response.success) {
      toast.success("Militar deletado com sucesso.");
      setMilitary(military.filter((m) => m.id !== id));
      handleCancel();
    } else {
      toast.error(response.error);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!graduation) {
      toast.error("Campo Posto/Graduação precisa ser preenchido.");
      document.getElementById("graduation")?.focus();
    }

    if (!rg) {
      toast.error("Campo RG precisa ser preenchido.");
      document.getElementById("rg")?.focus();
    }

    if (!name) {
      toast.error("Campo Nome de Guerra precisa ser preenchido.");
      document.getElementById("name")?.focus();
    }

    if (editing && !id) {
      toast.error("Identificador de usuário não encontrado.");
    }

    if (adding) {
      const response = await fetch("/api/military/create", {
        method: "POST",
        body: JSON.stringify({ graduation, rg: parseInt(rg), name }),
      }).then(async (res) => await res.json());

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Militar cadastrado com sucesso.");
        setMilitary([...military, response.military]);
        handleCancel();
      }
    }

    if (editing) {
      const response = await fetch(`/api/military/${id}/update`, {
        method: "PUT",
        body: JSON.stringify({ graduation, rg: parseInt(rg), name }),
      }).then(async (res) => await res.json());

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Militar atualizado com sucesso.");
        const militaryUpdated = military.map((m) => {
          if (m.id === id) {
            return { id, graduation, rg: parseInt(rg), name };
          }
          return m;
        });
        setMilitary(militaryUpdated);
        handleCancel();
      }
    }
  };

  return (
    <MainLayout title="Efetivo">
      <div className="mb-2">
        <div
          className={`${
            adding || editing || deleting ? "hidden" : "flex"
          } items-center justify-between`}
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
      </div>

      <div
        className={`${deleting ? "flex" : "hidden"} flex-col items-center mb-2`}
      >
        <div className="mb-1">
          <strong>Deseja realmente deletar o militar?</strong>
        </div>
        <div>
          <button
            className="px-4 py-1 mr-1 font-bold text-white bg-green-600 rounded-md"
            onClick={handleCancel}
          >
            Não
          </button>
          <button
            className="px-4 py-1 ml-1 font-bold text-white bg-red-600 rounded-md"
            onClick={handleDeleteMilitary}
          >
            Sim
          </button>
        </div>
      </div>

      <div
        className={`${
          adding || editing ? "flex" : "hidden"
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
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
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
                <option value="1º Sgt">1º Sgt</option>
                <option value="2º Sgt">2º Sgt</option>
                <option value="3º Sgt">3º Sgt</option>
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
        className={`${
          adding || editing || deleting ? "hidden" : "flex"
        } flex-col mb-2 rounded-t-md`}
      >
        <div
          id="cabecalho"
          className="bg-gray-400 border border-gray-800 rounded-t-md"
        >
          <div id="linha" className="flex font-bold uppercase">
            <div className="w-2/3 px-2 py-1 text-center border-r border-r-gray-800">
              Militar
            </div>
            <div className="w-1/3 px-2 py-1"></div>
          </div>
        </div>
        <div
          id="corpo"
          className="border-l border-r border-gray-800 rounded-b-md"
        >
          {military ? (
            military.map((m) => (
              <div
                key={m.id}
                className="flex border-b border-gray-800 last:rounded-b-md"
              >
                <div className="w-2/3 px-2 py-1 border-r border-r-gray-800">
                  {m.graduation} {m.rg} {m.name}
                </div>
                <div className="flex items-center justify-center w-1/3 px-2 py-1">
                  <button className="pr-1" onClick={() => handleEdit(m)}>
                    <FiEdit2 size={20} />
                  </button>
                  <button onClick={() => handleDeleting(m.id)}>
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex border-b border-gray-800 last:rounded-b-md">
              <div className="w-full px-2 py-1 text-center">
                Nenhum resultado foi encontrado
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        id="paginacao"
        className={`${
          adding || editing || deleting ? "hidden" : "flex"
        } items-center justify-center`}
      >
        <button>
          <FiChevronsLeft size={20} />
        </button>
        <button className="px-2">
          <FiChevronLeft size={20} />
        </button>
        <input
          className="w-10 text-center border border-gray-800 rounded-md focus:outline-none"
          type="text"
          onChange={handleChangePage}
          value={page.toString()}
        />
        <span className="pl-2">de</span>
        <span className="pl-2">3</span>
        <button className="pl-2">
          <FiChevronRight size={20} />
        </button>
        <button className="pl-2">
          <FiChevronsRight size={20} />
        </button>
      </div>
    </MainLayout>
  );
};

export default Efetivo;
