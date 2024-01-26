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

Route::get('/testlist', function () {
    return Inertia::render('Test/TestList');
})->middleware(['auth', 'verified'])->name('testlist');

Route::get('/testdetail', function () {
    return Inertia::render('Test/TestDetail');
})->middleware(['auth', 'verified'])->name('testdetail');

Route::get('/questionbank', function () {
    return Inertia::render('QuestionBank/QuestionBank');
})->middleware(['auth', 'verified'])->name('questionbank');

Route::get('/label', function () {
    return Inertia::render('Label/Label');
})->middleware(['auth', 'verified'])->name('label');

Route::get('/cooperator', function () {
    return Inertia::render('Cooperator/Cooperator');
})->middleware(['auth', 'verified'])->name('cooperator');

##################################################################

Route::get('/addquestionbank', function () {
    return Inertia::render('QuestionBank/AddQuestionBank');
})->middleware(['auth', 'verified'])->name('addquestionbank');

Route::get('/addlabel', function () {
    return Inertia::render('Label/AddLabel');
})->middleware(['auth', 'verified'])->name('addlabel');

Route::get('/addtest', function () {
    return Inertia::render('Test/AddTest');
})->middleware(['auth', 'verified'])->name('addtest');

Route::get('/addquestion', function () {
    return Inertia::render('Test/AddQuestion');
})->middleware(['auth', 'verified'])->name('addquestion');

Route::get('/addcooperator', function () {
    return Inertia::render('Cooperator/AddCooperator');
})->middleware(['auth', 'verified'])->name('addcooperator');

require __DIR__.'/auth.php';
