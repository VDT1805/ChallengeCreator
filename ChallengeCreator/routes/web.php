<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/questionbank', function () {
    return Inertia::render('QuestionBank');
})->middleware(['auth', 'verified'])->name('questionbank');

Route::get('/testlist', function () {
    return Inertia::render('TestPage');
})->middleware(['auth', 'verified'])->name('testlist');

Route::get('/addtest', function () {
    return Inertia::render('Test/AddTest');
})->middleware(['auth', 'verified'])->name('addtest');

Route::get('/testdetail', function () {
    return Inertia::render('Test/TestDetail');
})->middleware(['auth', 'verified'])->name('testdetail');

Route::get('/addquestion', function () {
    return Inertia::render('Test/AddQuestion');
})->middleware(['auth', 'verified'])->name('addquestion');

require __DIR__.'/auth.php';
