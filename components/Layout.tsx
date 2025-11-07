import React from 'react';
import { Page } from '../types';
import { NAV_ITEMS } from '../constants';
import { LogoIcon } from './icons/Icons';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <nav className="w-full md:w-64 bg-gray-900/50 backdrop-blur-lg border-b md:border-b-0 md:border-r border-gray-700/50 p-4 shrink-0 flex flex-col">
        <div className="flex-grow flex flex-col">
          <div className="flex items-center space-x-2 mb-8">
              <LogoIcon className="h-10 w-10 text-violet-400" />
              <h1 className="text-2xl font-bold text-white">MindMate</h1>
          </div>
          <ul className="space-y-2 flex-grow">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setCurrentPage(item.name)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left ${
                    currentPage === item.name
                      ? 'bg-violet-500/30 text-white font-semibold'
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
