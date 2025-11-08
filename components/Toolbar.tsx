import React from 'react';

interface ToolbarProps {
    children: React.ReactNode;
}

const Toolbar: React.FC<ToolbarProps> = ({ children }) => {
    return (
        <div className="w-full max-w-2xl mt-4">
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 flex items-center justify-center space-x-4">
                {children}
            </div>
        </div>
    );
};

export default Toolbar;
