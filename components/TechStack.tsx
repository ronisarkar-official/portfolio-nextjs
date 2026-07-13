import Image from "next/image";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/animate-ui/components/animate/tooltip";

import { TECH_STACK } from "../lib/tech-stack";

export default function TechStack() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold text-foreground">Tech Stack</h2>
      
      <div className="rounded-lg border bg-card p-3">
        <TooltipProvider>
          <ul className="flex flex-wrap gap-4 select-none">
            {TECH_STACK.map((tech) => {
              return (
                <li key={tech.key} className="flex">
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href={tech.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tech.title}
                        className="block transition-transform hover:scale-110"
                      >
                        {tech.theme ? (
                          <>
                            <Image
                              src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-light.svg`}
                              alt={`${tech.title} light icon`}
                              width={32}
                              height={32}
                              className="hidden [html.light_&]:block"
                              loading="lazy"
                              unoptimized
                            />
                            <Image
                              src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-dark.svg`}
                              alt={`${tech.title} dark icon`}
                              width={32}
                              height={32}
                              className="hidden [html.dark_&]:block"
                              loading="lazy"
                              unoptimized
                            />
                          </>
                        ) : (
                          <Image
                            src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}.svg`}
                            alt={`${tech.title} icon`}
                            width={32}
                            height={32}
                            loading="lazy"
                            unoptimized
                          />
                        )}
                        <span className="sr-only">{tech.title}</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tech.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </TooltipProvider>
      </div>
    </section>
  );
}
