import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ projects }) {
	const [deletingId, setDeletingId] = useState(null);

	const deleteProject = (id) => {
		if (
			confirm(
				"Are you sure you want to delete this project? This cannot be undone.",
			)
		) {
			setDeletingId(id);
			router.delete(`/projects/${id}`, {
				onFinish: () => setDeletingId(null),
			});
		}
	};

	const getStatusStyles = (status) => {
		switch (status) {
			case "In Progress":
				return "bg-blue-50 text-blue-700 ring-blue-600/20";
			case "Completed":
				return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
			case "On Hold":
				return "bg-amber-50 text-amber-700 ring-amber-600/20";
			default:
				return "bg-zinc-50 text-zinc-700 ring-zinc-600/20"; // Planning
		}
	};

	const getPriorityStyles = (priority) => {
		switch (priority) {
			case "High":
				return "bg-red-50 text-red-700 ring-red-600/20";
			case "Medium":
				return "bg-orange-50 text-orange-700 ring-orange-600/20";
			default:
				return "bg-zinc-50 text-zinc-600 ring-zinc-500/20"; // Low
		}
	};

	return (
		<div className="min-h-screen bg-zinc-50/50">
			<div className="mx-auto max-w-6xl p-6 md:p-8">
				{/* Header */}
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
					<div>
						<h1 className="text- font-semibold tracking-tight text-zinc-900">
							Projects
						</h1>
						<p className="mt-1 text-[13.5px] text-zinc-500">
							Manage and track all your client projects in one place.
							<span className="ml-2 inline-flex items-center rounded-full bg-zinc-900 px-2 py-0.5 text- font-medium text-white">
								{projects.length} total
							</span>
						</p>
					</div>

					<Link
						href="/projects/create"
						className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-[13.5px] font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-900/20">
						<span className="text- leading-none">+</span>
						New Project
					</Link>
				</div>

				{/* Table Card */}
				<div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-zinc-100 bg-zinc-50/50">
									<th className="px-6 py-3.5 text-left text- font-semibold uppercase tracking-wider text-zinc-500">
										Client
									</th>
									<th className="px-6 py-3.5 text-left text- font-semibold uppercase tracking-wider text-zinc-500">
										Project
									</th>
									<th className="px-6 py-3.5 text-left text- font-semibold uppercase tracking-wider text-zinc-500">
										Status
									</th>
									<th className="px-6 py-3.5 text-left text- font-semibold uppercase tracking-wider text-zinc-500">
										Priority
									</th>
									<th className="px-6 py-3.5 text-left text- font-semibold uppercase tracking-wider text-zinc-500">
										Due Date
									</th>
									<th className="px-6 py-3.5 text-right text- font-semibold uppercase tracking-wider text-zinc-500">
										Actions
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-zinc-100">
								{projects.map((project) => (
									<tr
										key={project.id}
										className="group transition hover:bg-zinc-50/70">
										<td className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text- font-medium text-white">
													{project.client_name?.charAt(0)?.toUpperCase()}
												</div>
												<span className="text-[13.5px] font-medium text-zinc-900">
													{project.client_name}
												</span>
											</div>
										</td>

										<td className="px-6 py-4">
											<span className="text-[13.5px] font-medium text-zinc-900">
												{project.project_name}
											</span>
										</td>

										<td className="px-6 py-4">
											<span
												className={`inline-flex items-center rounded-full px-2.5 py-1 text- font-medium ring-1 ring-inset ${getStatusStyles(project.status)}`}>
												<span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current"></span>
												{project.status}
											</span>
										</td>

										<td className="px-6 py-4">
											<span
												className={`inline-flex items-center rounded-full px-2.5 py-1 text- font-medium ring-1 ring-inset ${getPriorityStyles(project.priority)}`}>
												{project.priority}
											</span>
										</td>

										<td className="px-6 py-4 text- text-zinc-600">
											{project.due_date ? (
												new Date(project.due_date).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
													year: "numeric",
												})
											) : (
												<span className="text-zinc-400">—</span>
											)}
										</td>

										<td className="px-6 py-4">
											<div className="flex items-center justify-end gap-1">
												<Link
													href={`/projects/${project.id}/edit`}
													className="rounded-md px-2.5 py-1.5 text- font-medium text-zinc-600 transition hover:bg-white hover:text-zinc-900 hover:shadow-sm border border-transparent hover:border-zinc-200">
													Edit
												</Link>
												<button
													onClick={() => deleteProject(project.id)}
													disabled={deletingId === project.id}
													className="rounded-md px-2.5 py-1.5 text- font-medium text-zinc-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50">
													{deletingId === project.id ? "Deleting..." : "Delete"}
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{projects.length === 0 && (
							<div className="flex flex-col items-center justify-center px-6 py-20 text-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
									<svg
										className="h-6 w-6 text-zinc-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414A1 1 0 006.586 13H4"
										/>
									</svg>
								</div>
								<h3 className="mt-4 text- font-semibold text-zinc-900">
									No projects yet
								</h3>
								<p className="mt-1 max-w-sm text-[13.5px] text-zinc-500">
									Get started by creating your first project. Track status,
									priority and deadlines.
								</p>
								<Link
									href="/projects/create"
									className="mt-6 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-[13.5px] font-medium text-white hover:bg-zinc-800">
									Create Project
								</Link>
							</div>
						)}
					</div>
				</div>

				<p className="mt-4 text-center text-[11.5px] text-zinc-400">
					Showing {projects.length}{" "}
					{projects.length === 1 ? "project" : "projects"}
				</p>
			</div>
		</div>
	);
}
