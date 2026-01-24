export const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 my-4 px-2">
    <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#dbe1e6] to-[#dbe1e6]" />
    <span className="text-xxs sm:text-xxs font-black text-[#617789] uppercase tracking-[0.2em] whitespace-nowrap bg-[#f8fafc] px-3 py-1 rounded-full border border-[#edf1f4]">
      {label}
    </span>
    <div className="h-px flex-1 bg-linear-to-l from-transparent via-[#dbe1e6] to-[#dbe1e6]" />
  </div>
);