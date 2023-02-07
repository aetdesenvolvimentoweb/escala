import MainLayout from "@/components/layout/main";
import Head from "next/head";

const Home = () => {
  return (
    <MainLayout title="página inicial">
      <div className="flex flex-col items-center justify-center mb-4 font-bold">
        <h1 className="text-base font-bold">Escala de Serviço</h1>
        <span> 10/02/2023 para o dia 11/02/2023</span>
      </div>
      <div className="mb-2">
        <span className="font-bold">Oficial de Sobreaviso:</span>
        <span className="pl-2">Maj 02.622 Dutra</span>
      </div>
      <div className="mb-2">
        <span className="font-bold">Adjunto:</span>
        <span className="pl-2">2º Sgt 01.815 Santos</span>
      </div>
      <div className="flex flex-col mb-2">
        <span className="font-bold">UR-297</span>
        <div className="pl-4 mb-1">
          <span>3º Sgt 03.278 Thiago</span>
        </div>
        <div className="pl-4 mb-1">
          <span>3º Sgt 03.433 Ernandes</span>
          <strong className="pl-2 text-red-600">AC-4</strong>
        </div>
        <div className="pl-4 mb-1">
          <span>Cb 03.604 Miguel </span>
          <strong className="pl-2 text-red-600">Prefeitura</strong>
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <span className="font-bold">ABT-51</span>
        <div className="pl-4 mb-1">
          <span>2º Sgt 01.815 Santos</span>
        </div>
        <div className="pl-4 mb-1">
          <span>3º Sgt 02.644 Bruno</span>
        </div>
        <div className="pl-4 mb-1">
          <span>Cb 03.434 Rodrigues</span>
        </div>
      </div>
      <div>
        <h2 className="mb-1 font-bold">Trocas de serviço</h2>
        <div className="p-2 mb-2 text-white bg-red-600 rounded-md">
          <div className="mb-1">
            <span>Substituto:</span>
            <span className="pl-2">3º Sgt 03.278 Thiago</span>
          </div>
          <div className="mb-1">
            <span>Substituído:</span>
            <span className="pl-2">3º Sgt 03.433 Ernandes</span>
          </div>
          <div>
            <span>Período:</span>
            <span className="pl-2">24 horas</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
