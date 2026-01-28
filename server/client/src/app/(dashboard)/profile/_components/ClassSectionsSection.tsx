import { Users } from "lucide-react";

interface ClassSectionsSectionProps {
  classSectionIds: string[];
}

const ClassSectionsSection = ({
  classSectionIds,
}: ClassSectionsSectionProps) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
      <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
        <h2 className="text-md font-black text-[#111518] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-orange-500 flex items-center justify-center text-white">
            <Users size={16} />
          </div>
          Assigned Class Sections
        </h2>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {classSectionIds.map((sectionId, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-blue-100"
            >
              {sectionId}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassSectionsSection;