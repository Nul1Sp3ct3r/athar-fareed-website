"use client";

import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { EASE } from "@/lib/animations";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Rough height of the open panel, used only to decide whether to open upward. */
const OPTION_HEIGHT = 46;
const PANEL_MAX = 352;

/**
 * Select-only combobox (WAI-ARIA APG pattern): a button with role="combobox"
 * that owns a listbox. Focus stays on the button; the active option is exposed
 * through aria-activedescendant. The closed state matches the form's
 * underline fields; the open panel is a soft rounded surface.
 */
export function Select({
  id,
  labelId,
  value,
  options,
  placeholder,
  onChange,
  invalid,
  describedBy,
  className,
}: {
  id: string;
  labelId: string;
  value: string;
  options: readonly string[];
  placeholder: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", at: 0 });

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [dropUp, setDropUp] = useState(false);

  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const selected = options.indexOf(value);
  const last = options.length - 1;

  function openAt(index: number) {
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const needed = Math.min(options.length * OPTION_HEIGHT + 16, PANEL_MAX);
      const below = window.innerHeight - rect.bottom;
      setDropUp(below < needed && rect.top > below);
    }
    setActive(Math.max(0, Math.min(index, last)));
    setOpen(true);
  }

  function choose(index: number) {
    if (index >= 0) onChange(options[index]);
    setOpen(false);
    buttonRef.current?.focus();
  }

  /** First option starting with the typed characters, cycling from `from`. */
  function match(key: string, from: number) {
    const now = Date.now();
    const state = typeahead.current;
    state.text = now - state.at < 600 ? state.text + key : key;
    state.at = now;
    const query = state.text.toLocaleLowerCase();
    for (let step = 1; step <= options.length; step++) {
      const index = (from + step) % options.length;
      if (options[index].toLocaleLowerCase().startsWith(query)) return index;
    }
    return -1;
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const { key } = event;
    const printable = key.length === 1 && key !== " " && !event.ctrlKey && !event.metaKey && !event.altKey;

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
        event.preventDefault();
        openAt(selected >= 0 ? selected : 0);
      } else if (key === "Home" || key === "End") {
        event.preventDefault();
        openAt(key === "Home" ? 0 : last);
      } else if (printable) {
        const index = match(key, selected);
        if (index >= 0) openAt(index);
      }
      return;
    }

    switch (key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (event.altKey) choose(active);
        else setActive((index) => Math.max(index - 1, 0));
        break;
      case "Home":
      case "PageUp":
        event.preventDefault();
        setActive(key === "Home" ? 0 : Math.max(active - 10, 0));
        break;
      case "End":
      case "PageDown":
        event.preventDefault();
        setActive(key === "End" ? last : Math.min(active + 10, last));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(active);
        break;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        // APG: Tab commits the highlighted option, then focus moves on.
        if (active >= 0) onChange(options[active]);
        setOpen(false);
        break;
      default:
        if (printable) {
          const index = match(key, active);
          if (index >= 0) setActive(index);
        }
    }
  }

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    // Keyboard activation is handled in onKeyDown; only react to pointers.
    if (event.detail === 0) return;
    if (open) setOpen(false);
    else openAt(selected >= 0 ? selected : 0);
  }

  // Close when pointing anywhere outside the control.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option visible inside the panel (not the page).
  useEffect(() => {
    const list = listRef.current;
    if (!open || !list || active < 0) return;
    const option = list.children[active] as HTMLElement | undefined;
    if (!option) return;
    if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop - 6;
    else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight + 6;
    }
  }, [open, active]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={cn(
          "mt-3 flex w-full items-center justify-between gap-4 border-b bg-transparent pb-3 text-start text-base outline-none",
          "transition-colors duration-300 hover:border-ink/25 focus:border-cobalt",
          open ? "border-cobalt" : "border-ink/15",
          value ? "text-ink" : "text-ink-faint/80",
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          aria-hidden
          strokeWidth={1.75}
          className={cn(
            "size-4 shrink-0 text-ink-faint transition-transform duration-300 ease-out-expo",
            open && "rotate-180 text-ink",
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            tabIndex={-1}
            data-lenis-prevent
            initial={{ opacity: 0, y: reduce ? 0 : dropUp ? 6 : -6, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : dropUp ? 4 : -4, scale: reduce ? 1 : 0.99 }}
            transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
            style={{ transformOrigin: dropUp ? "bottom" : "top" }}
            className={cn(
              "absolute inset-x-0 z-30 max-h-[22rem] overflow-y-auto overscroll-contain rounded-[1.25rem] border border-ink/10 bg-paper-raised p-1.5",
              "shadow-[0_18px_40px_-24px_rgba(23,22,26,0.22)]",
              dropUp ? "bottom-full mb-2" : "top-full mt-2",
            )}
          >
            {options.map((option, index) => {
              const isSelected = index === selected;
              const isActive = index === active;
              return (
                <li
                  key={option}
                  id={optionId(index)}
                  role="option"
                  aria-selected={isSelected}
                  onPointerMove={() => setActive(index)}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => choose(index)}
                  className={cn(
                    "flex cursor-pointer select-none items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-base transition-colors duration-150",
                    isActive ? "bg-paper-sunk/70 text-ink" : "text-ink-soft",
                    isSelected && "font-semibold text-ink",
                  )}
                >
                  <span>{option}</span>
                  {isSelected ? <Check aria-hidden strokeWidth={2} className="size-4 shrink-0 text-ink" /> : null}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
