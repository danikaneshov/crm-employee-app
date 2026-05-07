const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="mb-8">
          <span className="text-4xl font-black tracking-tighter text-slate-900">Unitu<span className="text-primary">.</span></span>
          <p className="text-slate-500 mt-2">Единая система управления</p>
        </div>
        
        <p className="text-slate-600 mb-2 font-medium">Откройте приложение по ссылке вашей компании.</p>
        <p className="text-slate-400 text-sm">Пример: /your-company-slug</p>
      </div>
    </div>
  );
};

export default Landing;
