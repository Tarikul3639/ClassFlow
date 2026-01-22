"use client";

export const BackgroundEffects: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 bg-grid-pattern opacity-40 z-1 pointer-events-none h-150 mask-[linear-gradient(to_bottom,white,transparent)]"></div>
      <div className="absolute w-96 h-96 -top-20 -left-20 blur-3xl rounded-full bg-primary/10 z-1"></div>
      <div className="absolute w-64 h-64 top-40 right-10 blur-2xl rounded-full bg-primary/10 z-1"></div>
    </>
  );
};
