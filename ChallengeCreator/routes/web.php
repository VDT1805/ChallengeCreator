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

Route::get('/settings', function () {
    return Inertia::render('Settings');
})->middleware(['auth', 'verified'])->name('settings');

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

Route::get('/category', function () {
    return Inertia::render('Category/Category');
})->middleware(['auth', 'verified'])->name('category');

Route::get('/member', function () {
    return Inertia::render('Member/Member');
})->middleware(['auth', 'verified'])->name('member');

Route::get('/import', function () {
    return Inertia::render('Import/Import');
})->middleware(['auth', 'verified'])->name('import');

Route::get('/importinstruction', function () {
    return Inertia::render('Import/ImportInstruction');
})->middleware(['auth', 'verified'])->name('importinstruction');

Route::get('/reusequestion', function () {
    return Inertia::render('QuestionBank/ReuseQuestion');
})->middleware(['auth', 'verified'])->name('reusequestion');

##################################################################

Route::get('/addquestionbank', function () {
    return Inertia::render('QuestionBank/AddQuestionBank');
})->middleware(['auth', 'verified'])->name('addquestionbank');

Route::get('/addcategory', function () {
    return Inertia::render('Category/AddCategory');
})->middleware(['auth', 'verified'])->name('addcategory');

Route::get('/addtest', function () {
    return Inertia::render('Test/AddTest');
})->middleware(['auth', 'verified'])->name('addtest');

Route::get('/addquestion', function () {
    return Inertia::render('Test/AddQuestion');
})->middleware(['auth', 'verified'])->name('addquestion');

Route::get('/addmember', function () {
    return Inertia::render('Member/AddMember');
})->middleware(['auth', 'verified'])->name('addmember');

require __DIR__.'/auth.php';
