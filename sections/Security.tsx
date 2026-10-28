"use client";

const ecosystemNodes = [
  {
    id: 1,
    title: "Jewellery Cloud",
    partner: "Powered by LIMOVI",
    isLimovi: true,
    desc: "Custom on-demand jewellery catalogs. Manufactured and stored securely via LIMOVI Vaults.",
  },
  {
    id: 2,
    title: "Physical Gold Loans",
    partner: "Top NBFCs",
    domain: "rbi.org.in",
    isLimovi: false,
    desc: "Partnered with trusted NBFCs to provide secure and flexible physical gold-backed loans.",
  },
  {
    id: 3,
    title: "Instant Liquidity",
    partner: "Powered by LIMOVI",
    isLimovi: true,
    desc: "Ensuring you have instant, seamless access to your wealth whenever you need it.",
  },
  {
    id: 4,
    title: "Digital Gold",
    partner: "Powered by LIMOVI Partners",
    isLimovi: true,
    desc: "A secure, 24K pure digital gold balance powered directly by LIMOVI.",
  },
  {
    id: 5,
    title: "Digital Gold Loans",
    partner: "Powered by LIMOVI Partners",
    isLimovi: true,
    desc: "Instant credit against your digital gold balance, powered seamlessly by LIMOVI.",
  }
];

export function Security() {
  return (
    <section className="section bg-[var(--color-bg)] overflow-hidden">
      <div className="frame">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3" data-reveal>
          <h2 className="display t-head text-[var(--color-ink)]">The LIMOVI ecosystem</h2>
          <span className="t-body text-[var(--color-muted)] tabular">{ecosystemNodes.length} connected services</span>
        </div>
        <p className="t-lead text-[var(--color-ink)] mt-6 max-w-[48ch]" data-reveal style={{ ["--i" as string]: 1 }}>
          Our network: a dynamic, interconnected network of industry leaders providing you a seamless end-to-end gold experience.
        </p>

        <ul className="mt-14 grid md:grid-cols-2 gap-x-16 gap-y-10">
          {ecosystemNodes.map((node, i) => (
            <li key={node.id} className="group flex items-start gap-5" data-reveal style={{ ["--i" as string]: i }}>
              <div className="w-16 h-16 shrink-0 bg-[var(--color-surface)] flex items-center justify-center overflow-hidden transition-colors duration-200 group-hover:bg-[var(--color-tile)]">
                {node.isLimovi ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src="/browser-logo.png" alt="LIMOVI" className="w-full h-full object-cover scale-125" />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${node.domain}&size=64`}
                    alt={node.partner}
                    className="h-9 w-9 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="t-lead font-medium text-[var(--color-ink)]">{node.title}</h3>
                  <span className="t-small font-medium text-[var(--color-field)]">{node.partner}</span>
                </div>
                <p className="t-body text-[var(--color-muted)] mt-1.5 max-w-[46ch]">{node.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
