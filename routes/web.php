<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Projects
|--------------------------------------------------------------------------
*/

Route::get('/projects', [ProjectController::class, 'index'])
    ->name('projects.index');

Route::get('/projects/create', function () {
    return Inertia::render('Projects/Create');
})->name('projects.create');

Route::post('/projects', [ProjectController::class, 'store'])
    ->name('projects.store');

Route::get('/projects/{project}/edit', function (Project $project) {
    return Inertia::render('Projects/Edit', [
        'project' => $project,
    ]);
})->name('projects.edit');

Route::put('/projects/{project}', [ProjectController::class, 'update'])
    ->name('projects.update');

Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])
    ->name('projects.destroy');

require __DIR__ . '/auth.php';
