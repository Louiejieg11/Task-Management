import { useForm } from "@inertiajs/react";

export default function ProjectForm({ project = null }) {
	const isEditing = !!project;

	const { data, setData, post, put, processing, errors } = useForm({
		client_name: project?.client_name ?? "",
		project_name: project?.project_name ?? "",
		description: project?.description ?? "",
		status: project?.status ?? "Planning",
		priority: project?.priority ?? "Low",
		start_date: project?.start_date ?? "",
		due_date: project?.due_date ?? "",
	});

	const submit = (e) => {
		e.preventDefault();
		if (isEditing) {
			put(`/projects/${project.id}`);
		} else {
			post("/projects");
		}
	};

	const inputBase =
		"w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text- text-zinc-900 placeholder:text-zinc-400 shadow-sm transition-all outline-none focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/10";
	const inputError =
		"border-red-300 focus:border-red-500 focus:ring-red-500/10";
	const labelBase = "text- font-medium text-zinc-700";

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
				{/* Header */}
				<div className="border-b border-zinc-100 px-8 py-6">
					<h2 className="text- font-semibold tracking-tight text-zinc-900">
						{isEditing ? "Edit Project" : "New Project"}
					</h2>
					<p className="mt-1 text-[13.5px] text-zinc-500">
						{isEditing
							? "Update the project details below."
							: "Fill in the details to create a new project."}
					</p>
				</div>

				<form
					onSubmit={submit}
					className="px-8 py-7">
					<div className="space-y-6">
						{/* Row 1 */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div className="space-y-2">
								<label className={labelBase}>Client Name</label>
								<input
									type="text"
									placeholder="e.g. Acme Inc."
									value={data.client_name}
									onChange={(e) => setData("client_name", e.target.value)}
									className={`${inputBase} ${errors.client_name ? inputError : ""}`}
								/>
								{errors.client_name && (
									<p className="text-[12.5px] text-red-600">
										{errors.client_name}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<label className={labelBase}>Project Name</label>
								<input
									type="text"
									placeholder="e.g. Website Redesign"
									value={data.project_name}
									onChange={(e) => setData("project_name", e.target.value)}
									className={`${inputBase} ${errors.project_name ? inputError : ""}`}
								/>
								{errors.project_name && (
									<p className="text-[12.5px] text-red-600">
										{errors.project_name}
									</p>
								)}
							</div>
						</div>

						{/* Description */}
						<div className="space-y-2">
							<label className={labelBase}>Description</label>
							<textarea
								value={data.description}
								onChange={(e) => setData("description", e.target.value)}
								placeholder="Briefly describe the project goals, deliverables..."
								rows="4"
								className={`${inputBase} resize-none ${errors.description ? inputError : ""}`}
							/>
							{errors.description && (
								<p className="text-[12.5px] text-red-600">
									{errors.description}
								</p>
							)}
						</div>

						{/* Row 2 - Status & Priority */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div className="space-y-2">
								<label className={labelBase}>Status</label>
								<select
									value={data.status}
									onChange={(e) => setData("status", e.target.value)}
									className={`${inputBase} ${errors.status ? inputError : ""}`}>
									<option value="Planning">Planning</option>
									<option value="In Progress">In Progress</option>
									<option value="On Hold">On Hold</option>
									<option value="Completed">Completed</option>
								</select>
								{errors.status && (
									<p className="text-[12.5px] text-red-600">{errors.status}</p>
								)}
							</div>

							<div className="space-y-2">
								<label className={labelBase}>Priority</label>
								<select
									value={data.priority}
									onChange={(e) => setData("priority", e.target.value)}
									className={`${inputBase} ${errors.priority ? inputError : ""}`}>
									<option value="Low">Low</option>
									<option value="Medium">Medium</option>
									<option value="High">High</option>
								</select>
								{errors.priority && (
									<p className="text-[12.5px] text-red-600">
										{errors.priority}
									</p>
								)}
							</div>
						</div>

						{/* Row 3 - Dates */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div className="space-y-2">
								<label className={labelBase}>Start Date</label>
								<input
									type="date"
									value={data.start_date}
									onChange={(e) => setData("start_date", e.target.value)}
									className={`${inputBase} ${errors.start_date ? inputError : ""}`}
								/>
								{errors.start_date && (
									<p className="text-[12.5px] text-red-600">
										{errors.start_date}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<label className={labelBase}>Due Date</label>
								<input
									type="date"
									value={data.due_date}
									onChange={(e) => setData("due_date", e.target.value)}
									className={`${inputBase} ${errors.due_date ? inputError : ""}`}
								/>
								{errors.due_date && (
									<p className="text-[12.5px] text-red-600">
										{errors.due_date}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Footer Actions */}
					<div className="mt-8 flex items-center justify-end gap-3 border-t border-zinc-100 pt-6">
						<button
							type="button"
							onClick={() => window.history.back()}
							className="rounded-lg px-4 py-2.5 text- font-medium text-zinc-700 hover:bg-zinc-100 transition">
							Cancel
						</button>
						<button
							type="submit"
							disabled={processing}
							className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text- font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-900/20 disabled:opacity-50 disabled:pointer-events-none">
							{processing
								? "Saving..."
								: isEditing
									? "Update Project"
									: "Create Project"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
