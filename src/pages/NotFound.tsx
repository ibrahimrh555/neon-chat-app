
const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Page non trouvée</p>
        <a 
          href="/" 
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
