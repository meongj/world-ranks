import * as React from "react";
import {cn} from "@/lib/utils";

function InfoList({className, children}: React.HTMLAttributes<HTMLDListElement>) {
  return <dl className={cn("divide-y divide-border rounded-lg border bg-card", className)}>{children}</dl>;
}

interface InfoListRowProps {
  label: string;
  value: React.ReactNode;
}

function InfoListRow({label, value}: InfoListRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm text-right text-foreground">{value ?? "-"}</dd>
    </div>
  );
}

InfoList.Row = InfoListRow;

export {InfoList};
