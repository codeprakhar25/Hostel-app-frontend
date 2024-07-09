import { IconSearchOff } from '@tabler/icons-react';


export const NoRecordsFound = () => (
  <div className="flex flex-col items-center justify-center mt-8 p-4 border border-gray-300 bg-gray-50 rounded-md">
    <IconSearchOff className="w-16 h-16 text-gray-500" />
    <h2 className="text-2xl font-bold text-gray-600 mt-4">No records found</h2>
    <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria.</p>
  </div>
);
