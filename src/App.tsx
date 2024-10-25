import React from 'react';
import { UserCircle } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <UserCircle className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            User Registration
          </h1>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}

export default App;