import React from "react";
import { ArrowRight, ArrowDown, CheckCircle2, AlertTriangle, Lightbulb, Info } from "lucide-react";

// -----------------------------------------------------------------------------
// 1. FlowDiagram & FlowStep Components (Seamless Minimalist Flow)
// -----------------------------------------------------------------------------
export interface FlowStepItem {
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
}

export function FlowStep({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full md:flex-1 bg-background rounded-xl border border-foreground/10 p-4 shadow-2xs hover:border-foreground/20 transition-all flex flex-col justify-center">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h5 className="text-sm font-bold text-foreground leading-snug">{title}</h5>
        {badge && (
          <span className="font-mono text-[9px] font-semibold px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/70 shrink-0">
            {badge}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-muted-foreground font-medium">{subtitle}</p>
      )}
      {children && (
        <div className="text-xs text-foreground/70 mt-1.5 border-t border-foreground/5 pt-1.5 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

interface FlowDiagramProps {
  title?: string;
  steps?: FlowStepItem[];
  children?: React.ReactNode;
}

export function FlowDiagram({ title, steps = [], children }: FlowDiagramProps) {
  const safeSteps = Array.isArray(steps) ? steps : [];

  return (
    <div className="my-8 not-prose font-sans">
      {title && (
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
          {title}
        </p>
      )}

      {children ? (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {React.Children.map(children, (child, idx) => {
            const count = React.Children.count(children);
            return (
              <React.Fragment key={idx}>
                {child}
                {idx < count - 1 && (
                  <div className="text-foreground/30 flex items-center justify-center py-1 md:py-0 shrink-0">
                    <ArrowRight className="hidden md:block w-4 h-4 stroke-[2]" />
                    <ArrowDown className="md:hidden w-4 h-4 stroke-[2]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : safeSteps.length > 0 ? (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {safeSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="w-full md:flex-1 bg-background rounded-xl border border-foreground/10 p-4 shadow-2xs hover:border-foreground/20 transition-all flex flex-col justify-center">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h5 className="text-sm font-bold text-foreground leading-snug">
                    {step.title}
                  </h5>
                  {step.badge && (
                    <span className="font-mono text-[9px] font-semibold px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/70 shrink-0">
                      {step.badge}
                    </span>
                  )}
                </div>
                {step.subtitle && (
                  <p className="text-xs text-muted-foreground font-medium">
                    {step.subtitle}
                  </p>
                )}
                {step.description && (
                  <div className="text-xs text-foreground/70 mt-1.5 border-t border-foreground/5 pt-1.5 leading-relaxed">
                    {step.description}
                  </div>
                )}
              </div>

              {idx < safeSteps.length - 1 && (
                <div className="text-foreground/30 flex items-center justify-center py-1 md:py-0 shrink-0">
                  <ArrowRight className="hidden md:block w-4 h-4 stroke-[2]" />
                  <ArrowDown className="md:hidden w-4 h-4 stroke-[2]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 2. TopicSilo & SiloCluster Components (Seamless Tree Hierarchy)
// -----------------------------------------------------------------------------
export interface SiloNode {
  title: string;
  badge?: string;
  desc?: string;
}

export function SiloCluster({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-background rounded-xl border border-foreground/10 p-3.5 text-center shadow-2xs hover:border-foreground/20 transition-all flex flex-col justify-between">
      <div>
        {badge && (
          <span className="font-mono text-[9px] uppercase font-semibold px-2 py-0.5 rounded-md bg-foreground/5 text-muted-foreground block w-fit mx-auto mb-1.5">
            {badge}
          </span>
        )}
        <h6 className="text-xs font-bold text-foreground leading-snug">{title}</h6>
      </div>
      {children && (
        <div className="text-[11px] text-foreground/70 mt-2 border-t border-foreground/5 pt-1.5 leading-tight">
          {children}
        </div>
      )}
    </div>
  );
}

interface TopicSiloProps {
  pillar?: SiloNode;
  clusters?: SiloNode[];
  children?: React.ReactNode;
}

export function TopicSilo({
  pillar = { title: "Página Pilar" },
  clusters = [],
  children,
}: TopicSiloProps) {
  const safeClusters = Array.isArray(clusters) ? clusters : [];

  return (
    <div className="my-8 not-prose font-sans flex flex-col items-center">
      {/* Pillar / Money Page */}
      <div className="w-full max-w-md bg-foreground text-background rounded-xl p-4 shadow-sm text-center">
        <div className="inline-block font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-background/20 text-background mb-1.5">
          {pillar?.badge || "Página Pilar (Money Page)"}
        </div>
        <h5 className="text-base font-bold leading-tight text-background">
          {pillar?.title}
        </h5>
        {pillar?.desc && (
          <p className="text-xs text-background/80 mt-1">{pillar.desc}</p>
        )}
      </div>

      {/* Connector Tree */}
      <div className="flex flex-col items-center my-3">
        <div className="w-px h-5 bg-foreground/20" />
        <div className="w-full max-w-xs h-px bg-foreground/20" />
      </div>

      {/* Satellite Clusters */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {children
          ? children
          : safeClusters.map((cluster, i) => (
              <div
                key={i}
                className="bg-background rounded-xl border border-foreground/10 p-3.5 text-center shadow-2xs hover:border-foreground/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[9px] uppercase font-semibold px-2 py-0.5 rounded-md bg-foreground/5 text-muted-foreground block w-fit mx-auto mb-1.5">
                    {cluster.badge || `Soporte ${i + 1}`}
                  </span>
                  <h6 className="text-xs font-bold text-foreground leading-snug">
                    {cluster.title}
                  </h6>
                </div>
                {cluster.desc && (
                  <p className="text-[11px] text-foreground/70 mt-2 border-t border-foreground/5 pt-1.5 leading-tight">
                    {cluster.desc}
                  </p>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. Callout Component (Clean Minimalist Alert without Tag)
// -----------------------------------------------------------------------------
interface CalloutProps {
  type?: "tip" | "info" | "warning" | "success";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = {
    tip: {
      icon: Lightbulb,
      border: "border-amber-500/25",
      bg: "bg-amber-500/5",
      accent: "text-amber-600 dark:text-amber-400",
    },
    info: {
      icon: Info,
      border: "border-blue-500/25",
      bg: "bg-blue-500/5",
      accent: "text-blue-600 dark:text-blue-400",
    },
    warning: {
      icon: AlertTriangle,
      border: "border-orange-500/25",
      bg: "bg-orange-500/5",
      accent: "text-orange-600 dark:text-orange-400",
    },
    success: {
      icon: CheckCircle2,
      border: "border-emerald-500/25",
      bg: "bg-emerald-500/5",
      accent: "text-emerald-600 dark:text-emerald-400",
    },
  }[type] || {
    icon: Info,
    border: "border-blue-500/25",
    bg: "bg-blue-500/5",
    accent: "text-blue-600 dark:text-blue-400",
  };

  const IconComponent = config.icon;

  return (
    <div className={`my-6 rounded-xl border ${config.border} ${config.bg} p-5 font-sans not-prose`}>
      <div className="flex items-start gap-3.5">
        <div className={`p-1 rounded-md shrink-0 mt-0.5 ${config.accent}`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1 text-sm text-foreground/90 leading-relaxed">
          {title && (
            <h5 className="font-bold text-foreground mb-1 text-sm leading-snug">
              {title}
            </h5>
          )}
          <div className="text-foreground/80">{children}</div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Component Registry Export
// -----------------------------------------------------------------------------
export const blogMdxComponents = {
  FlowDiagram,
  FlowStep,
  TopicSilo,
  SiloCluster,
  Callout,
};
