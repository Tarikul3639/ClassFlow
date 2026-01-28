interface MetadataSectionProps {
  createdAt: string;
  updatedAt: string;
}

const MetadataSection = ({ createdAt, updatedAt }: MetadataSectionProps) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-[#dbe1e6]">
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-xxs font-black text-gray-400 uppercase tracking-widest mb-1">
            Created At
          </p>
          <p className="text-xs font-bold text-gray-600">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-xxs font-black text-gray-400 uppercase tracking-widest mb-1">
            Last Updated
          </p>
          <p className="text-xs font-bold text-gray-600">
            {new Date(updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetadataSection;