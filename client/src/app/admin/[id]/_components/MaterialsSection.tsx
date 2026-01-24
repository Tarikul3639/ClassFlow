import React from "react";
import { Link as LinkIcon, PlusCircle, Trash2 } from "lucide-react";
import { IMaterial } from "@/types/event";

interface MaterialsSectionProps {
  materials: IMaterial[];
  setMaterials: React.Dispatch<React.SetStateAction<IMaterial[]>>;
}

export const MaterialsSection = ({ materials, setMaterials }: MaterialsSectionProps) => {
  const addMaterial = () => {
    // setMaterials([
    //   ...materials,
    //   { _id: Date.now().toString(), type: "", name: "", url: "" },
    // ]);
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter((m) => m._id !== id));
  };

  const updateMaterial = (id: string, field: keyof IMaterial, value: string) => {
    setMaterials(
      materials.map((m) => (m._id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <section className="space-y-3 sm:space-y-5 lg:space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg bg-[#399aef]/10 flex items-center justify-center text-[#399aef]">
            <LinkIcon size={16} className="lg:w-5 lg:h-5" />
          </div>
          <h3 className="text-xsm sm:text-sm lg:text-base font-black text-[#111518] uppercase tracking-wider">
            Materials
          </h3>
        </div>
        <button
          onClick={addMaterial}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg lg:rounded-xl bg-[#399aef] text-white text-xxxxs sm:text-xxxs lg:text-xxs font-black uppercase tracking-widest hover:bg-[#2d82cc] transition-all shadow-lg shadow-[#399aef]/10"
        >
          <PlusCircle size={12} className="lg:w-3.5 lg:h-3.5" /> Add Material
        </button>
      </div>

      <div className="grid gap-2 sm:gap-3 lg:gap-4">
        {materials.map((m) => (
          <div
            key={m._id}
            className="flex flex-col md:flex-row gap-4 p-4 sm:p-5 lg:p-6 bg-[#f8fafc] border border-dashed border-[#dbe1e6] rounded-xl lg:rounded-2xl group transition-all hover:border-[#399aef] hover:bg-white"
          >
            {/* Material Name Input */}
            <div className="flex-1 space-y-1.5 lg:space-y-2">
              <p className="text-xxxxs sm:text-xxxxs lg:text-xxxs font-black text-[#617789] uppercase tracking-[0.2em]">
                Material Name
              </p>
              <input
                value={m.name}
                onChange={(e) => updateMaterial(m._id, "name", e.target.value)}
                type="text"
                className="w-full bg-transparent font-bold text-xxsm md:text-xsm lg:text-sm outline-none text-[#111518] placeholder:font-medium"
                placeholder="e.g. Lecture Notes"
              />
            </div>

            {/* URL Input */}
            <div className="flex-[1.5] space-y-1.5 lg:space-y-2">
              <p className="text-xxxxs sm:text-xxxxs lg:text-xxxs font-black text-[#617789] uppercase tracking-[0.2em]">
                Resource URL
              </p>
              <input
                value={m.url}
                onChange={(e) => updateMaterial(m._id, "url", e.target.value)}
                type="url"
                className="w-full bg-transparent font-medium text-xxs md:text-xs lg:text-xsm text-[#399aef] outline-none"
                placeholder="https://drive.google.com/..."
              />
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeMaterial(m._id)}
              className="self-end md:self-center p-2 text-[#617789] hover:text-red-500 transition-colors bg-white md:bg-transparent rounded-lg border border-[#f1f5f9] md:border-none shadow-sm md:shadow-none"
              title="Remove Material"
            >
              <Trash2 size={16} className="lg:w-5 lg:h-5" />
            </button>
          </div>
        ))}

        {materials.length === 0 && (
          <div className="py-10 border-2 border-dashed border-[#f1f5f9] rounded-xl lg:rounded-2xl flex flex-col items-center justify-center gap-2 opacity-50 bg-[#f8fafc]/50">
            <p className="text-xxxs sm:text-xxs lg:text-xs font-bold text-[#617789]">No materials added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};