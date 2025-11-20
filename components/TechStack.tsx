import Image from "next/image";
import React from "react";

import { Tooltip, TooltipTrigger, TooltipPanel } from "@/components/animate-ui/components/base/tooltip";

import { TECH_STACK } from "../lib/tech-stack";

export default function TechStack() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold text-foreground">Tech Stack</h2>
      
      <div className="rounded-lg border border-edge bg-card p-3">
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
                            unoptimized
                          />
                          <Image
                            src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-dark.svg`}
                            alt={`${tech.title} dark icon`}
                            width={32}
                            height={32}
                            className="hidden [html.dark_&]:block"
                            unoptimized
                          />
                        </>
                      ) : (
                        <Image
                          src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}.svg`}
                          alt={`${tech.title} icon`}
                          width={32}
                          height={32}
                          unoptimized
                        />
                      )}
                      <span className="sr-only">{tech.title}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipPanel className="z-50">
                    {tech.title}
                  </TooltipPanel>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
