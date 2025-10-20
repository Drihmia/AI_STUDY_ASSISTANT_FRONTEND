import React, { memo } from 'react';

const ServerStatus = ({ serverStatus, t }) => {
  if (serverStatus === 'offline' || serverStatus === 'starting') {
    return (
      <div className="flex overflow-y-auto flex-col flex-1 w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg my-4">
        <div className={`text-center p-2 text-gray-500 ${serverStatus === 'starting' ? 'bg-yellow-100' : 'bg-red-100'}`}>
          {serverStatus === 'starting' ? t.serverStarting : t.serverOffline}
        </div>
      </div>
    );
  }
  return null;
};

export default memo(ServerStatus);
