import React from 'react';
import { useTranslation } from 'react-i18next';

const StepsSection = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 bg-background-light dark:bg-[#08150d]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-black text-center mb-16">{t("Open An Account In 3 Easy Steps")}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="relative p-10 rounded-2xl bg-background-dark border border-primary/10 text-center">
          <span className="absolute top-4 right-6 text-8xl font-black text-primary/5 select-none">1</span>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl">edit_note</span>
          </div>
          <h3 className="text-xl font-bold mb-4">{t("Register")}</h3>
          <p className="text-slate-400">{t("Complete our secure online application in minutes.")}</p>
        </div>
        <div className="relative p-10 rounded-2xl bg-background-dark border border-primary/10 text-center">
          <span className="absolute top-4 right-6 text-8xl font-black text-primary/5 select-none">2</span>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl">payments</span>
          </div>
          <h3 className="text-xl font-bold mb-4">{t("Fund")}</h3>
          <p className="text-slate-400">{t("Add capital via wire transfer, ACH, or account transfer.")}</p>
        </div>
        <div className="relative p-10 rounded-2xl bg-background-dark border border-primary/10 text-center">
          <span className="absolute top-4 right-6 text-8xl font-black text-primary/5 select-none">3</span>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl">rocket_launch</span>
          </div>
          <h3 className="text-xl font-bold mb-4">{t("Trade")}</h3>
          <p className="text-slate-400">{t("Start executing trades on your platform of choice.")}</p>
        </div>
      </div>
    </div>
    </div>
  </section>
  );
};

export { StepsSection };
