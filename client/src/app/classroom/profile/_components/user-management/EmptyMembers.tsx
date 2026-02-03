import { Users } from "lucide-react";

const EmptyMembers = () => {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <Users size={24} className="text-gray-400" />
      </div>
      <p className="text-sm font-bold text-gray-400">No members yet</p>
      <p className="text-xs text-gray-400 mt-1">
        Share the join code to invite students
      </p>
    </div>
  );
};

export default EmptyMembers;