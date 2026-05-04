export default function InfoCard({
  title,
  eyebrow,
  icon: Icon,
  accent = "blue",
  children,
  action,
}) {
  const accents = {
    blue: "from-brand-100 via-white to-sky-50",
    amber: "from-amber-100 via-white to-orange-50",
    emerald: "from-emerald-100 via-white to-teal-50",
    slate: "from-slate-100 via-white to-slate-50",
  };

  return (
    <section
      className={`glass-panel bg-gradient-to-br ${accents[accent] ?? accents.blue} p-6`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow ? <p className="section-heading">{eyebrow}</p> : null}
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{title}</h2>
        </div>
        {Icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
            <Icon className="text-xl" />
          </div>
        ) : null}
      </div>
      <div className="mt-5">{children}</div>
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  );
}
