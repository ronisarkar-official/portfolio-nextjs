import data from "@/data/projects.json";
import { projectSchema } from "@/lib/schemas";
import { ProjectCard } from "./ProjectCard";

interface Props {
  limit?: number;
}

export default function Projects({ limit }: Props) {
  try {
    const { projects } = projectSchema.parse(data);
    const displayProjects = limit ? projects.slice(0, limit) : projects;

    if (displayProjects.length === 0) {
      return (
        <section className="text-center py-8">
          <p className="text-muted-foreground">No projects available at the moment.</p>
        </section>
      );
    }

    return (
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {displayProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </section>
    );
  } catch (error) {
    console.error('Error loading projects:', error);
    return (
      <section className="text-center py-8">
        <p className="text-destructive">Failed to load projects. Please try again later.</p>
      </section>
    );
  }
}
