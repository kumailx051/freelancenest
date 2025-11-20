import React from 'react';
import AuthExample from '../components/AuthExample';

const FirebaseTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Firebase Integration Test</h1>
        <p className="text-center text-gray-600 mb-8">
          This page demonstrates Firebase authentication integration with your freelance platform.
        </p>
        <AuthExample />
      </div>
    </div>
  );
};

export default FirebaseTestPage;
