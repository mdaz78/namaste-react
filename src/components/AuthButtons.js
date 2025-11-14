const AuthButtons = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="px-6 py-2 text-doordash-dark font-medium hover:bg-doordash-light-gray rounded-full transition-colors">
        Sign In
      </button>
      <button className="px-6 py-2 bg-doordash-red text-white font-medium rounded-full hover:bg-[#E02900] transition-colors shadow-sm">
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons;
