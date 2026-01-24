import data from "@/data/socials.json";
import { socialSchema } from "@/lib/schemas";
import Icon from "./Icon";
import {
  Tooltip,
  TooltipTrigger,
  TooltipPanel,
} from "@/components/animate-ui/components/base/tooltip";

export default function Socials() {
  const socials = socialSchema.parse(data).socials;

  return (
    <section className="flex gap-6">
      {socials.map((item) => (
        <Tooltip key={item.name}>
          <TooltipTrigger
            className="text-muted-foreground hover:text-foreground transition-colors"
            render={
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <span className="sr-only">{item.name}</span>
            <Icon name={item.icon} aria-hidden="true" className="size-5" />
          </TooltipTrigger>
          <TooltipPanel side="top">{item.name}</TooltipPanel>
        </Tooltip>
      ))}
    </section>
  );
}
