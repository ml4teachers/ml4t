'use client';
import { AcademicCapIcon, LinkIcon, BookOpenIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect } from 'react';

const features = [
  {
    link: '/tools/chatgpt',
    name: 'Tools',
    description:
      'Entdecke eine kontinuierlich wachsende Liste von KI Tools für den Unterricht.',
    icon: WrenchScrewdriverIcon,
  },
  {
    link: '/teaching',
    name: 'Unterricht',
    description:
      'Finde Richtlinien und Empfehlungen für den sinnvollen Einsatz von KI im Unterricht.',
    icon: AcademicCapIcon,
  },
  {
    link: '/glossary/gpt',
    name: 'Begriffe',
    description:
      'Erlange einen Überblick über die wichtigsten Begriffe im Bereich der Künstlichen Intelligenz.',
    icon: BookOpenIcon,
  },
  {
    link: '/links',
    name: 'Ressourcen',
    description:
      'Eine Liste mit hilfreichen Materialien und Fachpersonen, die sich auf den Einsatz von KI in der Bildung spezialisiert haben.',
    icon: LinkIcon,
  },
]

export default function News() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-sky-600">Künstliche Intelligenz für den Unterricht</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Alles, was du über KI wissen musst
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-700">
          Hier findest du Hintergrundwissen zu KI Tools, die du im Unterricht einsetzen kannst, sowie Neuigkeiten aus der KI-Welt, die für den Unterricht relevant sind.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl ">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 mb-20">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <Link href={`${feature.link}`}>
                    <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                    </dt>
                </Link>
                <dd className="mt-2 text-base leading-7 text-slate-700">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
