<?php

use App\Http\Controllers\LabelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionBankController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TestController;
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

Route::get('/qbs', [QuestionBankController::class,'index'])
->middleware(['auth', 'verified'])->name('questionbanks.index');

Route::get('/qbs/create', [QuestionBankController::class,'create'])
->middleware(['auth', 'verified'])->name('questionbanks.create');

Route::post('/qbs/create', [QuestionBankController::class,'store'])
->middleware(['auth', 'verified'])->name('questionbanks.store');

Route::get('/qbs/{qbID}', [QuestionBankController::class,'show'])
->middleware(['auth', 'verified','dynamicrole:owner|editor|viewer'])->name('questionbanks.show');

Route::get('/qbs/{qbID}/settings', [QuestionBankController::class,'edit'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('questionbanks.edit');

Route::put('/qbs/{qbID}/settings', [QuestionBankController::class,'update'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('questionbanks.update');

Route::delete('/qbs/{qbID}/settings', [QuestionBankController::class,'destroy'])
->middleware(['auth', 'verified','dynamicrole:owner'])->name('questionbanks.destroy');

##################################################################

Route::get('/qbs/{qbID}/questions',[QuestionController::class,'index'])
->middleware(['auth', 'verified','dynamicrole:owner|editor|viewer'])->name('questions.index');

Route::get('/qbs/{qbID}/questions/create/', [QuestionController::class,'create'])
->middleware(['auth', 'verified'])->name('questions.create');

Route::post('/qbs/{qbID}/questions/create', [QuestionController::class,'store'])
->middleware(['auth', 'verified'])->name('questions.store');

Route::get('/qbs/{qbID}/questions/{qID}', [QuestionController::class,'show'])
->middleware(['auth', 'verified','dynamicrole:owner|editor|viewer'])->name('questions.show');

Route::get('/qbs/{qbID}/questions/{qID}/edit', [QuestionController::class,'edit'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('questions.edit');

Route::put('/qbs/{qbID}/questions/{qID}/edit', [QuestionController::class,'update'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('questions.update');

Route::delete('/qbs/{qbID}/questions/{qID}/edit', [QuestionController::class,'destroy'])
->middleware(['auth', 'verified','dynamicrole:owner'])->name('questions.destroy');

##################################################################

Route::get('/qbs/{qbID}/tests',[TestController::class,'index'])
->middleware(['auth', 'verified','dynamicrole:owner|editor|viewer'])->name('tests.index');

Route::get('/qbs/{qbID}/tests/create/', [TestController::class,'create'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('tests.create');

Route::post('/qbs/{qbID}/tests/create', [TestController::class,'store'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('tests.store');

Route::get('/qbs/{qbID}/tests/{testID}', [TestController::class,'show'])
->middleware(['auth', 'verified','dynamicrole:owner|editor|viewer'])->name('tests.show');

Route::get('/qbs/{qbID}/tests/{testID}/edit', [TestController::class,'edit'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('tests.edit');

Route::put('/qbs/{qbID}/tests/{testID}/edit', [TestController::class,'update'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('tests.update');

Route::delete('/qbs/{qbID}/tests/{testID}/edit', [TestController::class,'destroy'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('tests.destroy');

Route::get('/qbs/{qbID}/tests/{testID}/createques', [TestController::class,'createQuestion'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('tests.createQuestion');

Route::post('/qbs/{qbID}/tests/{testID}/createques', [TestController::class,'storeQuestion'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('tests.storeQuestion');

Route::get('/qbs/{qbID}/tests/{testID}/addques', [TestController::class,'indexQuestion'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('tests.indexQuestion');

Route::post('/qbs/{qbID}/tests/{testID}/addques', [TestController::class,'attachQuestion'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('tests.attachQuestion');

Route::put('/qbs/{qbID}/tests/{testID}/addques', [TestController::class,'detachQuestion'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('tests.detachQuestion');

Route::get('/qbs/{qbID}/tests/{testID}/pdf', [TestController::class,'pdfGenerate'])
->middleware(['auth', 'verified','dynamicrole:owner|editor|viewer'])->name('tests.pdfGen');

##################################################################


Route::get('/qbs/{qbID}/labels',[LabelController::class,'index'])
->middleware(['auth', 'verified','dynamicrole:owner|editor|viewer'])->name('labels.index');

Route::get('/qbs/{qbID}/labels/create/', [LabelController::class,'create'])
->middleware(['auth', 'verified'])->name('labels.create');

Route::post('/qbs/{qbID}/labels/create', [LabelController::class,'store'])
->middleware(['auth', 'verified'])->name('labels.store');

Route::get('/qbs/{qbID}/labels/{label}', [LabelController::class,'show'])
->middleware(['auth', 'verified','dynamicrole:owner|editor|viewer'])->name('labels.show');

Route::get('/qbs/{qbID}/labels/{label}/edit', [LabelController::class,'edit'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('labels.edit');

Route::put('/qbs/{qbID}/labels/{label}/edit', [LabelController::class,'update'])
->middleware(['auth', 'verified','dynamicrole:owner|editor'])->name('labels.update');

Route::delete('/qbs/{qbID}/labels/{label}/edit', [LabelController::class,'destroy'])
->middleware(['auth', 'verified','dynamicrole:owner'])->name('labels.destroy');

Route::get('/addcategory', function () {
    return Inertia::render('Category/AddCategory');
})->middleware(['auth', 'verified'])->name('addcategory');




Route::get('/addmember', function () {
    return Inertia::render('Member/AddMember');
})->middleware(['auth', 'verified'])->name('addmember');

require __DIR__.'/auth.php';
