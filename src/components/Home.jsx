import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-100">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-100">
    <div className="flex justify-end px-4 pt-4">
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://images.pexels.com/photos/4966168/pexels-photo-4966168.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-dark">SecuredBlocks.io</h5>
        <span className="text-sm text-dark-500 dark:text-dark">Login As  </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <a href="/WalletConnection" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Patient</a>
            <a href="/WalletConnection" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Hospital</a>
        </div>
    </div>
</div>
      </div>
    </div>
  );
};

export default Home;
