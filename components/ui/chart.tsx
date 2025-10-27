"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import type { TooltipProps, LegendProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { cn } from "./utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = { config: ChartConfig };

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context)
    throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ReactNode;
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-layer]:outline-hidden [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, c]) => c.theme || c.color
  );
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, c]) => {
    const color = c.theme?.[theme as keyof typeof c.theme] || c.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

export const ChartTooltip = RechartsPrimitive.Tooltip;

// ✅ 안전한 TooltipContent 타입 정의
type SafeTooltipProps = TooltipProps<ValueType, NameType> & {
  className?: string;
  // 👇 실제 런타임에서 전달되는 필드 수동 정의
  active?: boolean;
  label?: string | number;
  payload?: {
    name?: string;
    value?: number | string;
    color?: string;
    payload?: Record<string, unknown>;
  }[];
};

export function ChartTooltipContent(props: SafeTooltipProps) {
  const { active, label, className } = props;
  const { config } = useChart();

  const payload = props.payload ?? [];

  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "border border-border bg-background rounded-md px-2 py-1 text-xs shadow-md min-w-[8rem]",
        className
      )}
    >
      {label && (
        <div className="font-medium text-foreground mb-1">{label}</div>
      )}
      {payload.map((entry, i) => {
        const key = entry.name ?? `v${i}`;
        const itemConfig =
          key && config[key as keyof typeof config]
            ? config[key as keyof typeof config]
            : undefined;

        return (
          <div
            key={i}
            className="flex justify-between gap-2 items-center text-muted-foreground"
          >
            <span className="flex items-center gap-1">
              {itemConfig?.icon && <itemConfig.icon />}
              {itemConfig?.label || entry.name}
            </span>
            <span className="font-mono text-foreground">
              {entry.value?.toString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export const ChartLegend = RechartsPrimitive.Legend;

export function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
}: {
  className?: string;
  hideIcon?: boolean;
  payload?: {
    value?: string;
    color?: string;
    dataKey?: string;
  }[];
}) {

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 pt-2 text-xs text-muted-foreground",
        className
      )}
    >
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          {!hideIcon && (
            <div
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
          )}
          {item.value}
        </div>
      ))}
    </div>
  );
}
