import MainLayout from "@/components/layout/main";

const Users = () => {
  return (
    <MainLayout title="página de usuários">
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <button className="px-4 py-1 bg-green-600 rounded-md">Novo</button>
          <div className="flex items-center p-1 border border-gray-800 rounded-md">
            <input className="px-2 focus:outline-none" type="text" />
            <button>S</button>
          </div>
        </div>
      </div>
      <div id="table" className="flex flex-col mb-2 rounded-t-md">
        <div
          id="cabecalho"
          className="bg-gray-400 border border-gray-800 rounded-t-md"
        >
          <div id="linha" className="flex font-bold uppercase">
            <div className="w-2/3 px-2 py-1 border-r border-r-gray-800">
              nome
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
              usuario 1
            </div>
            <div className="w-1/3 px-2 py-1">ações</div>
          </div>
          <div className="flex border-b border-gray-800 last:rounded-b-md">
            <div className="w-2/3 px-2 py-1 border-r border-r-gray-800">
              usuario 2
            </div>
            <div className="w-1/3 px-2 py-1">ações</div>
          </div>
        </div>
      </div>
      <div id="paginacao" className="flex items-center justify-center">
        <button>{"<<"}</button>
        <button className="px-2">{"<"}</button>
        <input
          className="w-10 text-center border border-gray-800 rounded-md focus:outline-none"
          type="text"
          value={1}
        />
        <span className="pl-2">de</span>
        <span className="pl-2">3</span>
        <button className="pl-2">{">"}</button>
        <button className="pl-2">{">>"}</button>
      </div>
    </MainLayout>
  );
};

export default Users;
