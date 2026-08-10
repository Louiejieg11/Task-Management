import { Link } from "@inertiajs/react";
import ProjectForm from "@/Components/ProjectForm";

export default function Create() {
	return (
		<div className="max-w-2xl mx-auto p-6">
			<div className="flex justify-between mb-6">
				<h1 className="text-2xl font-bold">Create Project</h1>

				<Link href="/">Back</Link>
			</div>

			<ProjectForm />
		</div>
	);
}
