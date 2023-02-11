import MainLayout from "@/components/layout/main";
import { IMilitaryDTO } from "@/dtos/IMilitaryDTO";
import { IVehicleDTO } from "@/dtos/IVehicleDTO";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  FiChevronsDown,
  FiMinusCircle,
  FiPlusCircle,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "@/components/layout/loading";
import { IGarrisonCreateDTO } from "@/dtos/IGarrisonDTO";
import { IServiceExchangeCreateDTO } from "@/dtos/IServiceExchange";
import { IForceMapCreateDTO } from "@/dtos/IForceMapDTO";

const Garrison = () => {
  const [vehicles, setVehicles] = useState<IVehicleDTO[]>([] as IVehicleDTO[]);
  const [military, setMilitary] = useState<IMilitaryDTO[]>(
    [] as IMilitaryDTO[]
  );
  const [militarySelected, setMilitarySelected] = useState<string>("");
  const [vehicleSelected, setVehicleSelected] = useState<string>("");
  const [militaryInGarrison, setMilitaryInGarrison] = useState<string[]>(
    [] as string[]
  );
  const [vehicleInGarrison, setVehicleInGarrison] = useState<string>("");
  const [replaced, setReplaced] = useState<string>("");
  const [substitute, setSubstitute] = useState<string>("");
  const [initialService, setInitialService] = useState<Date | null>(null);
  const [finalService, setFinalService] = useState<Date | null>(null);
  const [standbyOfficer, setStandbyOfficer] = useState<string>("");
  const [adjunct, setAdjunct] = useState<string>("");
  const [garrisons, setGarrisons] = useState<IGarrisonCreateDTO[]>(
    [] as IGarrisonCreateDTO[]
  );
  const [serviceExchanges, setServiceExchanges] = useState<
    IServiceExchangeCreateDTO[]
  >([] as IServiceExchangeCreateDTO[]);
  const [forceMap, setForceMap] = useState<IForceMapCreateDTO | null>(null);

  const [searched, setSearched] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFormOficial, setShowFormOficial] = useState<boolean>(false);
  const [showFormAdjunto, setShowFormAdjunto] = useState<boolean>(false);
  const [showFormGuarnicao, setShowFormGuarnicao] = useState<boolean>(false);
  const [showFormTrocaDeServico, setShowFormTrocaDeServico] =
    useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const dataVehicles = await fetch("/api/vehicles/listAll", {
        method: "GET",
      }).then(async (res) => res.json());
      setVehicles(dataVehicles.vehicles);

      const dataMilitary = await fetch("/api/military/listAll", {
        method: "GET",
      }).then(async (res) => res.json());
      setMilitary(dataMilitary.military);

      setLoading(false);
    };

    loadData();
  }, []);

  const handleShowFormOficialDeSobreaviso = () => {
    setShowFormOficial(true);
    setShowFormAdjunto(false);
    setShowFormGuarnicao(false);
    setShowFormTrocaDeServico(false);
  };

  const handleShowFormAdjunto = () => {
    setShowFormOficial(false);
    setShowFormAdjunto(true);
    setShowFormGuarnicao(false);
    setShowFormTrocaDeServico(false);
  };

  const handleShowFormGuarnicao = () => {
    setShowFormOficial(false);
    setShowFormAdjunto(false);
    setShowFormGuarnicao(true);
    setShowFormTrocaDeServico(false);
  };

  const handleShowFormTrocaDeServico = () => {
    setShowFormOficial(false);
    setShowFormAdjunto(false);
    setShowFormGuarnicao(false);
    setShowFormTrocaDeServico(true);
  };

  const handleCancel = () => {
    setPage(1);
    setMilitarySelected("");
    setShowFormOficial(false);
    setShowFormAdjunto(false);
    setShowFormGuarnicao(false);
    setShowFormTrocaDeServico(false);
    setVehicleInGarrison("");
    setMilitaryInGarrison([]);
  };

  const handleAddVehicleInGarrison = () => {
    if (vehicleSelected) {
      setVehicleInGarrison(vehicleSelected);
      setVehicleSelected("");
    } else {
      toast.error("Selecione a viatura.");
      document.getElementById("vehicles")?.focus();
    }
  };

  const handleAddMilitaryInGarrison = () => {
    if (militarySelected) {
      setMilitaryInGarrison([...militaryInGarrison, militarySelected]);
      setMilitarySelected("");
    } else {
      toast.error("Selecione o militar.");
      document.getElementById("military")?.focus();
    }
  };

  const handleAddStandbyOfficerToForceMap = (event: FormEvent) => {
    event.preventDefault();
    if (militarySelected) {
      setStandbyOfficer(militarySelected);
      handleCancel();
    } else {
      toast.error("Selecione o oficial de sobreaviso.");
      document.getElementById("standbyOfficer")?.focus();
    }
  };

  const handleAddAdjunctToForceMap = (event: FormEvent) => {
    event.preventDefault();
    if (militarySelected) {
      setAdjunct(militarySelected);
      handleCancel();
    } else {
      toast.error("Selecione o adjunto.");
      document.getElementById("adjunct")?.focus();
    }
  };

  const handleAddGarrisonToForceMap = (event: FormEvent) => {
    event.preventDefault();
    if (vehicleInGarrison && militaryInGarrison.length > 0) {
      setGarrisons([
        ...garrisons,
        { vehicle: vehicleInGarrison, military: militaryInGarrison },
      ]);
      handleCancel();
    } else {
      toast.error("Selecione o adjunto.");
      document.getElementById("adjunct")?.focus();
    }
  };

  const handleAddServiceExchangesToForceMap = (event: FormEvent) => {
    event.preventDefault();

    if (!replaced) {
      toast.error("Selecione o militar que foi substituído.");
      document.getElementById("replaced")?.focus();
      return;
    }

    if (!substitute) {
      toast.error("Selecione o militar que substituiu.");
      document.getElementById("substitute")?.focus();
      return;
    }

    if (!initialService) {
      toast.error("Informe o período inicial da troca de serviço.");
      document.getElementById("initial")?.focus();
      return;
    }

    if (!finalService) {
      toast.error("Informe o período final da troca de serviço.");
      document.getElementById("final")?.focus();
      return;
    }

    setServiceExchanges([
      ...serviceExchanges,
      { replaced, substitute, initial: initialService, final: finalService },
    ]);

    setReplaced("");
    setSubstitute("");
    setInitialService(null);
    setFinalService(null);
    setShowFormTrocaDeServico(false);
  };

  const handleSubmitForceMap = (event: FormEvent) => {
    event.preventDefault();

    if (!standbyOfficer) {
      toast.error("Oficial de sobreaviso não encontrado.");
      return;
    }

    if (!adjunct) {
      toast.error("Adjunto não encontrado.");
      return;
    }

    if (garrisons.length < 1) {
      toast.error("Nenhuma guarnição encontrada.");
      return;
    }

    const data: IForceMapCreateDTO = {
      standbyOfficer,
      adjunct,
      garrisons,
      serviceExchanges,
    };

    console.log("dados finais do mapa força", data);
  };

  const renderButtonsForm = () => {
    return (
      <div className="flex items-center mt-4">
        <button
          className="w-1/2 px-6 py-2 mr-1 font-bold text-gray-800 bg-transparent border-gray-800 rounded-md outline-none focus:border hover:border mr1"
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          className="w-1/2 px-6 py-2 mr-1 font-bold text-white bg-green-600 border border-gray-800 rounded-md outline-none mr1"
          type="submit"
        >
          Salvar
        </button>
      </div>
    );
  };

  return (
    <MainLayout title={new Date(Date.now()).toLocaleDateString()}>
      {/* loading */}
      {loading && <Loading />}

      {/* início da barra de botões */}
      <div>
        <div className={"flex items-center justify-between"}>
          <button
            className="px-4 py-1 font-bold text-white bg-blue-600 rounded-md outline-none"
            aria-label="Oficial de sobreaviso"
            title="Oficial de sobreaviso"
            onClick={handleShowFormOficialDeSobreaviso}
          >
            <FiStar size={20} />
          </button>
          <button
            className="px-4 py-1 font-bold text-white bg-blue-600 rounded-md outline-none"
            aria-label="Adjunto"
            title="Adjunto"
            onClick={handleShowFormAdjunto}
          >
            <FiChevronsDown size={20} />
          </button>
          <button
            className="px-4 py-1 font-bold text-white bg-blue-600 rounded-md outline-none"
            aria-label="Guarnição"
            title="Guarnição"
            onClick={handleShowFormGuarnicao}
          >
            <FiUsers size={20} />
          </button>
          <button
            className="px-4 py-1 font-bold text-white bg-blue-600 rounded-md outline-none"
            aria-label="Troca de serviço"
            title="Troca de serviço"
            onClick={handleShowFormTrocaDeServico}
          >
            <FaExchangeAlt size={20} />
          </button>
        </div>
      </div>
      {/* final da barra de botões */}

      {/* início formulario oficial de sobreaviso */}
      <div
        className={`${
          showFormOficial ? "flex" : "hidden"
        } mt-4 items-center justify-between`}
      >
        <form
          className="w-full p-2 text-sm border border-gray-800 rounded-md"
          onSubmit={handleAddStandbyOfficerToForceMap}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 pr-1">
              <select
                id="standbyOfficer"
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setMilitarySelected(event.target.value)
                }
                value={militarySelected}
              >
                <option value="">Selecione</option>
                {military.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.graduation} {m.rg} {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {renderButtonsForm()}
        </form>
      </div>
      {/* final formulario oficial de sobreaviso */}

      {/* início formulario adjunto */}
      <div
        className={`${
          showFormAdjunto ? "flex" : "hidden"
        } mt-4 items-center justify-between`}
      >
        <form
          className="w-full p-2 text-sm border border-gray-800 rounded-md"
          onSubmit={handleAddAdjunctToForceMap}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 pr-1">
              <select
                id="adjunct"
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setMilitarySelected(event.target.value)
                }
                value={militarySelected}
              >
                <option value="">Selecione</option>
                {military.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.graduation} {m.rg} {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {renderButtonsForm()}
        </form>
      </div>
      {/* final formulario adjunto */}

      {/* início formulario guarnição */}
      <div
        className={`${
          showFormGuarnicao ? "flex" : "hidden"
        } items-center justify-between mt-4`}
      >
        <form
          className="w-full p-2 text-sm border border-gray-800 rounded-md"
          onSubmit={handleAddGarrisonToForceMap}
        >
          <div className="flex items-center mb-2">
            <div className="pr-1">
              <label htmlFor="vehicles">Viatura:</label>
            </div>
            <div className="flex-1 pr-1">
              <select
                id="vehicles"
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
                disabled={vehicleInGarrison.length > 0}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setVehicleSelected(event.target.value)
                }
                value={vehicleSelected}
              >
                <option value="">Selecione</option>
                {vehicles.map((v) => (
                  <option
                    disabled={
                      vehicleInGarrison === v.id ||
                      garrisons.filter((g) => g.vehicle === v.id).length > 0
                    }
                    key={v.id}
                    value={v.id}
                  >
                    {v.name}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                className={`flex ${
                  vehicleInGarrison.length > 0
                    ? "text-gray-400"
                    : "text-gray-800"
                } disabled:cursor-not-allowed`}
                type="button"
                title="adicionar viatura"
                aria-label="adicionar viatura"
                disabled={vehicleInGarrison.length > 0}
                onClick={handleAddVehicleInGarrison}
              >
                <FiPlusCircle size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="pr-1">
              <label htmlFor="military">Militar:</label>
            </div>
            <div className="flex-1 pr-1">
              <select
                id="military"
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setMilitarySelected(event.target.value)
                }
                disabled={vehicleInGarrison.length <= 0}
                value={militarySelected}
              >
                <option value="">Selecione</option>
                {military.map((m) => (
                  <option
                    disabled={
                      militaryInGarrison.includes(m.id) ||
                      garrisons.filter((g) => g.military.includes(m.id))
                        .length > 0
                    }
                    key={m.id}
                    value={m.id}
                  >
                    {m.graduation} {m.rg} {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                className={`flex ${
                  vehicleInGarrison.length <= 0
                    ? "text-gray-400"
                    : "text-gray-800"
                } disabled:cursor-not-allowed`}
                type="button"
                title="adicionar militar"
                aria-label="adicionar militar"
                onClick={handleAddMilitaryInGarrison}
              >
                <FiPlusCircle size={20} />
              </button>
            </div>
          </div>

          {(militaryInGarrison.length > 0 || vehicleInGarrison) && (
            <div className="p-2 mb-2 text-white bg-red-600 rounded-md">
              <div>
                {vehicles &&
                  vehicleInGarrison &&
                  vehicles.map((v) => {
                    if (vehicleInGarrison === v.id) {
                      return (
                        <div className="flex" key={v.id}>
                          <span className="pr-1 font-bold">{v.name}</span>
                          <button
                            className="text-white focus:outline-none"
                            type="button"
                          >
                            <FiMinusCircle size={20} />
                          </button>
                        </div>
                      );
                    }
                  })}
              </div>
              <div className="flex flex-col">
                {military &&
                  militaryInGarrison &&
                  military.map((m) => {
                    return militaryInGarrison.map((mig) => {
                      if (mig === m.id) {
                        return (
                          <div className="flex pt-1 pl-2" key={m.id}>
                            <span className="pr-1">
                              {m.graduation} {m.rg} {m.name}
                            </span>
                            <button className="flex text-white" type="button">
                              <FiMinusCircle size={20} />
                            </button>
                          </div>
                        );
                      }
                    });
                  })}
              </div>
            </div>
          )}

          {renderButtonsForm()}
        </form>
      </div>
      {/* final formulario guarnição */}

      {/* início formulario troca de serviço */}
      <div
        className={`${
          showFormTrocaDeServico ? "flex" : "hidden"
        } items-center justify-between mt-4`}
      >
        <form
          className="w-full p-2 text-sm border border-gray-800 rounded-md"
          onSubmit={handleAddServiceExchangesToForceMap}
        >
          <div className="font-bold">Troca de Serviço</div>
          <div className="flex items-center justify-between mt-3">
            <div className="pr-1">
              <label htmlFor="replaced">Substituído:</label>
            </div>
            <div className="flex-1 pr-1">
              <select
                id="replaced"
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setReplaced(event.target.value)
                }
                value={replaced}
              >
                <option value="">Selecione</option>
                {military.map((m) => (
                  <option
                    disabled={substitute === m.id}
                    key={m.id}
                    value={m.id}
                  >
                    {m.graduation} {m.rg} {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="pr-1">
              <label htmlFor="substitute">Substituto:</label>
            </div>
            <div className="flex-1 pr-1">
              <select
                id="substitute"
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setSubstitute(event.target.value)
                }
                value={substitute}
              >
                <option value="">Selecione</option>
                {military.map((m) => (
                  <option key={m.id} disabled={replaced === m.id} value={m.id}>
                    {m.graduation} {m.rg} {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="pr-1">
              <label htmlFor="initial">Início:</label>
            </div>
            <div className="flex-1 pr-1">
              <input
                type="datetime-local"
                id="initial"
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setInitialService(new Date(event.target.value + ":00"))
                }
                value={`${initialService?.toISOString().split("T")[0]}T${
                  initialService?.toTimeString().split(" GMT")[0]
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="pr-1">
              <label htmlFor="final">Final:</label>
            </div>
            <div className="flex-1 pr-1">
              <input
                type="datetime-local"
                id="final"
                className="w-full p-1 bg-white border border-gray-800 rounded-md focus:outline-none"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setFinalService(new Date(event.target.value + ":00"))
                }
                value={`${finalService?.toISOString().split("T")[0]}T${
                  finalService?.toTimeString().split(" GMT")[0]
                }`}
              />
            </div>
          </div>

          {renderButtonsForm()}
        </form>
      </div>
      {/* final formulario troca de serviço */}

      {/* início do mapa força */}
      {(standbyOfficer ||
        adjunct ||
        garrisons.length > 0 ||
        serviceExchanges.length > 0) && (
        <div className="mt-6">
          <form
            className="w-full p-2 text-sm border border-gray-800 rounded-md"
            onSubmit={handleSubmitForceMap}
          >
            <h2 className="mb-2 font-bold uppercase">
              Mapa Força em Desenvolvimento
            </h2>
            <div>
              <span className="pr-1 font-bold">Oficial de dia:</span>
              {military &&
                standbyOfficer &&
                military.map((m) => {
                  if (m.id === standbyOfficer) {
                    return (
                      <span key={m.id}>
                        {m.graduation} {m.rg} {m.name}
                      </span>
                    );
                  }
                })}
            </div>
            <div className="mt-1">
              <span className="pr-1 font-bold">Adjunto:</span>
              {military &&
                adjunct &&
                military.map((m) => {
                  if (m.id === adjunct) {
                    return (
                      <span key={m.id}>
                        {m.graduation} {m.rg} {m.name}
                      </span>
                    );
                  }
                })}
            </div>

            <div className="mt-1">
              <span className="font-bold">Guarnições:</span>
              {garrisons &&
                garrisons.map((g) => {
                  return vehicles.map((v) => {
                    if (v.id === g.vehicle) {
                      return (
                        <div
                          className="p-1 mb-2 border border-gray-800 rounded-md"
                          key={v.id}
                        >
                          <span className="block font-bold">{v.name}</span>
                          <div className="flex flex-col pl-4">
                            {g.military.map((gm) => {
                              return military.map((m) => {
                                if (gm === m.id) {
                                  return (
                                    <span key={m.id}>
                                      {m.graduation} {m.rg} {m.name}
                                    </span>
                                  );
                                }
                              });
                            })}
                          </div>
                        </div>
                      );
                    }
                  });
                })}
            </div>

            <div className="mt-1">
              <span className="font-bold">Trocas de Serviço:</span>
              {serviceExchanges &&
                serviceExchanges.map((s, index) => {
                  return (
                    <div
                      key={s.replaced + index}
                      className="flex flex-col p-1 mb-2 border border-gray-800 rounded-md"
                    >
                      <div>
                        <span className="pr-1 font-bold">Substituído:</span>
                        {military.map((m) => {
                          if (m.id === s.replaced) {
                            return (
                              <span key={m.id}>
                                {m.graduation} {m.rg} {m.name}
                              </span>
                            );
                          }
                        })}
                      </div>
                      <div>
                        <span className="pr-1 font-bold">Substituto:</span>
                        {military.map((m) => {
                          if (m.id === s.substitute) {
                            return (
                              <span key={m.id}>
                                {m.graduation} {m.rg} {m.name}
                              </span>
                            );
                          }
                        })}
                      </div>
                      <div>
                        <span className="pr-1 font-bold">Início:</span>
                        <span>{`${s.initial?.toLocaleDateString()} ${s.initial?.toLocaleTimeString()}`}</span>
                      </div>
                      <div>
                        <span className="pr-1 font-bold">Final:</span>
                        <span>{`${s.final?.toLocaleDateString()} ${s.final?.toLocaleTimeString()}`}</span>
                      </div>
                    </div>
                  );
                })}
            </div>

            {renderButtonsForm()}
          </form>
        </div>
      )}
      {/* final do mapa força */}
    </MainLayout>
  );
};

export default Garrison;
