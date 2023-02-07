import MainLayout from "@/components/layout/main";
import Head from "next/head";

const Home = () => {
  return (
    <MainLayout title="página inicial">
      <div className="flex flex-col items-center justify-center mb-4 text-sm font-bold">
        <span>Escala de Serviço</span>
        <span> 10/02/2023 para o dia 11/02/2023</span>
      </div>
      <div className="mb-2">
        <span className="text-sm font-bold">Oficial de Sobreaviso:</span>
        <span className="pl-2">Maj 02.622 Dutra</span>
      </div>
      <div className="mb-2">
        <span className="text-sm font-bold">Adjunto:</span>
        <span className="pl-2">2º Sgt 01.815 Santos</span>
      </div>
      <div className="flex flex-col mb-2">
        <span className="text-sm font-bold">UR-297</span>
        <span className="pl-2 mb-1">3º Sgt 03.278 Thiago</span>
        <span className="pl-2 mb-1">3º Sgt 03.433 Ernandes</span>
        <span className="pl-2 mb-1">Cb 03.604 Miguel</span>
      </div>
      <div className="flex flex-col mb-2">
        <span className="text-sm font-bold">ABT-51</span>
        <span className="pl-2 mb-1">2º Sgt 01.815 Santos</span>
        <span className="pl-2 mb-1">3º Sgt 02.644 Bruno</span>
        <span className="pl-2 mb-1">Cb 03.434 Rodrigues</span>
      </div>
    </MainLayout>
  );
};

export default Home;
