"use client";

import * as React from "react";
import { isOptionGroupArray } from "react-querybuilder";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function MultiSelect({ className, options = [], value, onValueChange }) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  const toDropdownOptions = (list: OptionList) =>
    isOptionGroupArray(list)
      ? list.map((og) => (
          <React.Fragment key={og.label}>
            <DropdownMenuLabel>{og.label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {og.options.map((opt) => (
              <DropdownMenuCheckboxItem
                key={opt.name}
                disabled={!!opt.disabled}
                checked={value.includes(opt.name)}
                onCheckedChange={(checked) => {
                  onValueChange(
                    checked
                      ? [...value, opt.name]
                      : value.filter((v) => v !== opt.name)
                  );
                }}
              >
                {opt.label}
              </DropdownMenuCheckboxItem>
            ))}
          </React.Fragment>
        ))
      : Array.isArray(list)
      ? list.map((opt) => (
          <DropdownMenuCheckboxItem
            key={opt.name}
            disabled={!!opt.disabled}
            checked={value.includes(opt.name)}
            onCheckedChange={(checked) => {
              onValueChange(
                checked
                  ? [...value, opt.name]
                  : value.filter((v) => v !== opt.name)
              );
            }}
          >
            {opt.label}
          </DropdownMenuCheckboxItem>
        ))
      : null;

  return (
    <DropdownMenu className={className}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("space-x-1", value.length > 0 && "px-1")}
        >
          {[...value].slice(0, 2).map((it) => (
            <div key={it} className="bg-accent px-3 py-1 rounded-sm text-sm">
              {it}
            </div>
          ))}
          {value.length > 2 && (
            <div className="bg-accent px-3 py-1 rounded-sm text-sm">
              +{value.length - 2}
            </div>
          )}
          {value.length === 0 && "Choose..."}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {toDropdownOptions(options)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
