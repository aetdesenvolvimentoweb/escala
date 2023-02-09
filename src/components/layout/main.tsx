import Head from "next/head";
import { ReactNode } from "react";

interface IMainLayoutProps {
  children: ReactNode;
  title: string;
}

const MainLayout = ({ children, title }: IMainLayoutProps) => {
  const pageTitle = `Resumo do Serviço > ${title}`;

  return (
    <div id="mainContainer" className="bg-gray-200">
      <div className="flex flex-col max-w-xs min-h-screen mx-auto">
        <Head>
          <title>Mapa Força - 18º BBM</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Aplicação para gerar e acompanhar o mapa força do 18º Batalhão Bombeiro Militar 18º BBM do Corpo de Bombeiros Militar do Estado de Goiás - CBMGO"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="flex items-center justify-between px-3 py-4 text-white bg-red-800">
          Mapa Força
        </header>
        <main className="flex-1 p-2 bg-red-600">
          <h1 className="p-2 mb-2 text-sm font-bold text-gray-800 rounded-md bg-gray-50">
            {pageTitle}
          </h1>
          <div className="p-2 text-sm text-gray-800 rounded-md bg-gray-50">
            {children}
          </div>
        </main>
        <footer className="flex items-center justify-center p-2 text-xs text-white bg-red-800">
          A & T Desenvolvimento Web
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
