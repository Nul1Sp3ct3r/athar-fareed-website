"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useId, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/animations";
import { useI18n } from "@/lib/i18n-client";
import { parseInquiry } from "@/lib/contact/schema";
import type { Inquiry, InquiryErrors } from "@/lib/contact/schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Inquiry = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  details: "",
  locale: "en",
};

function Field({
  label,
  htmlFor,
  optional,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("group/field relative", className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline gap-2 text-micro font-medium uppercase text-ink-faint transition-colors duration-300 group-focus-within/field:text-cobalt"
      >
        {label}
        {optional ? <span className="normal-case tracking-normal">({optional})</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "mt-3 w-full rounded-none border-b border-ink/15 bg-transparent px-0 pb-3 text-base text-ink outline-none " +
  "transition-[border-color,background-color] duration-300 placeholder:text-ink-faint/80 " +
  "hover:border-ink/25 focus:border-cobalt";

export function ContactForm() {
  const { t, locale } = useI18n();
  const id = useId();

  const [values, setValues] = useState<Inquiry>({ ...EMPTY, locale });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const messages: Record<string, string> = {
    required: t.form.required,
    email: t.form.invalidEmail,
  };

  function update<K extends keyof Inquiry>(key: K, value: Inquiry[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { data, errors: found, valid } = parseInquiry({ ...values, locale });
    if (!valid) {
      setErrors(found);
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("request_failed");

      setStatus("success");
      setValues({ ...EMPTY, locale });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="border-2 border-ink bg-paper-raised rounded-card p-8 sm:p-12"
        role="status"
      >
        <span aria-hidden className="flex size-2.5 rounded-full bg-cobalt" />
        <h2 className="mt-8 text-title font-semibold text-ink">{t.form.successTitle}</h2>
        <p className="mt-4 max-w-md text-base text-ink-soft">{t.form.successText}</p>
        <div className="mt-8">
          <Button type="button" variant="secondary" onClick={() => setStatus("idle")}>
            {t.form.again}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10">
      <Field label={t.form.name} htmlFor={`${id}-name`} error={errors.name && messages[errors.name]}>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          placeholder={t.form.namePlaceholder}
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label={t.form.company} htmlFor={`${id}-company`} optional={t.form.optional}>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          autoComplete="organization"
          placeholder={t.form.companyPlaceholder}
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
          className={inputClass}
        />
      </Field>

      <Field
        label={t.form.email}
        htmlFor={`${id}-email`}
        error={errors.email && messages[errors.email]}
      >
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          dir="ltr"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          placeholder={t.form.emailPlaceholder}
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          className={cn(inputClass, "text-start")}
        />
      </Field>

      <Field label={t.form.phone} htmlFor={`${id}-phone`} optional={t.form.optional}>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder={t.form.phonePlaceholder}
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          className={cn(inputClass, "text-start")}
        />
      </Field>

      <Field
        label={t.form.projectType}
        htmlFor={`${id}-type`}
        error={errors.projectType && messages[errors.projectType]}
      >
        <div className="relative">
          <select
            id={`${id}-type`}
            name="projectType"
            required
            aria-invalid={Boolean(errors.projectType)}
            value={values.projectType}
            onChange={(event) => update("projectType", event.target.value)}
            className={cn(inputClass, "appearance-none pe-8")}
          >
            <option value="">{t.form.select}</option>
            {t.form.projectTypes.map((type) => (
              <option key={type} value={type} className="bg-paper-raised text-ink">
                {type}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute bottom-4 end-0 size-4 text-ink-faint"
          />
        </div>
      </Field>

      <Field label={t.form.budget} htmlFor={`${id}-budget`} optional={t.form.optional}>
        <div className="relative">
          <select
            id={`${id}-budget`}
            name="budget"
            value={values.budget}
            onChange={(event) => update("budget", event.target.value)}
            className={cn(inputClass, "appearance-none pe-8")}
          >
            <option value="">{t.form.select}</option>
            {t.form.budgets.map((budget) => (
              <option key={budget} value={budget} className="bg-paper-raised text-ink">
                {budget}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute bottom-4 end-0 size-4 text-ink-faint"
          />
        </div>
      </Field>

      <Field
        label={t.form.details}
        htmlFor={`${id}-details`}
        error={errors.details && messages[errors.details]}
        className="sm:col-span-2"
      >
        <textarea
          id={`${id}-details`}
          name="details"
          rows={5}
          required
          aria-invalid={Boolean(errors.details)}
          aria-describedby={errors.details ? `${id}-details-error` : undefined}
          placeholder={t.form.detailsPlaceholder}
          value={values.details}
          onChange={(event) => update("details", event.target.value)}
          className={cn(inputClass, "resize-y")}
        />
      </Field>

      <div className="sm:col-span-2">
        {status === "error" ? (
          <div role="alert" className="mb-6 rounded-card border border-danger/50 bg-danger/8 p-5">
            <p className="text-sm font-medium text-ink">{t.form.errorTitle}</p>
            <p className="mt-1 text-sm text-ink-soft">{t.form.errorText}</p>
          </div>
        ) : null}

        <Button type="submit" size="lg" withArrow disabled={status === "submitting"}>
          {status === "submitting" ? t.form.submitting : t.form.submit}
        </Button>
      </div>
    </form>
  );
}
