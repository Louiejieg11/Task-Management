import { Link } from "@inertiajs/react";
import ProjectForm from "@/Components/ProjectForm";

export default function Edit({ project }) {
	return (
		<div className="max-w-2xl mx-auto p-6">
			<div className="flex justify-between mb-6">
				<h1 className="text-2xl font-bold">Edit Project</h1>

				<Link href="/projects">Back</Link>
			</div>

			<ProjectForm project={project} />
		</div>
	);
}
