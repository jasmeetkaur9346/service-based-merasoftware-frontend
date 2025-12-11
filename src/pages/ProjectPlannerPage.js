import React, { useState } from 'react';
import SmartPlanner from './ProjectPlanner';

const ProjectPlannerPage = () => {
  const [hasBusinessSelection, setHasBusinessSelection] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-1 sm:pt-12 sm:pb-2">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm sm:text-base font-semibold tracking-[0.4em] uppercase text-slate-500 dark:text-slate-400">
            Welcome to
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mt-2">
            Mera Software Project Planner
          </h1>
        </div>
      </header>
      <section className="relative px-2 pt-0 pb-0 sm:px-3 sm:pt-0 sm:pb-0">
        <div className="max-w-7xl mx-auto">
          <SmartPlanner
            showHero={false}
            mode="page"
            pageSpacing="minimal"
            onBusinessSelect={(selection) => setHasBusinessSelection(Boolean(selection))}
          />
        </div>
      </section>
      {!hasBusinessSelection && (
        <section className="px-1 mt-[-110px] sm:px-2 sm:mt-[-120px] pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto rounded-3xl border border-slate-200 bg-white/90 dark:border-slate-700 dark:bg-slate-800 p-5 sm:p-6 lg:p-7 shadow-[0_30px_70px_-45px_rgba(12,23,43,0.55)] flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold tracking-[0.2em] uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                Project Planning Suite
              </span>
              <h1 className="text-3xl sm:text-[2.3rem] font-black leading-tight">Plan. Share. Launch with clarity.</h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
                Smart Project Planner guides you through choosing business categories, features, and add-ons so you can hand over a clearly aligned roadmap.
              </p>
            </div>
            <div className="flex-1">
              <div className="rounded-3xl border border-slate-200 bg-white/85 px-5 py-6 shadow-xl dark:border-slate-600 dark:bg-slate-700">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-500 mb-2">
                  Ready-to-build brief
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Share your structured plan with us
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Outline every requirement inside Project Planner, capture them step by step, and send the plan to our team. We design and build your solution directly from this detailed blueprint.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectPlannerPage;
