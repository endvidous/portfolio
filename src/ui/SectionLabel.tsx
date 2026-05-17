const SectionLabel = ({ eyebrow, title }: { eyebrow?: string; title: string }) => (
  <div className="mb-16 md:mb-20">
    {eyebrow && (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium bg-brick/10 text-brick border border-brick/20 mb-4">
        {eyebrow}
      </span>
    )}
    <h2 className="font-black text-5xl md:text-7xl text-chalkWhite tracking-tight leading-none mt-2">
      {title}
    </h2>
    <div className="h-[2px] bg-brick w-16 mt-5" />
  </div>
);

export default SectionLabel;
