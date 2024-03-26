<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\Request;
use App\Http\Services\QuestionBankService;
use App\Http\Services\TestService;
use App\Http\Services\QuestionService;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Services\LabelService;
use Exception;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Mccarlosen\LaravelMpdf\Facades\LaravelMpdf;


class TestController extends Controller
{
    private TestService $tService;
    private QuestionBankService $qbService;
    private QuestionService $qService;
    private LabelService $lService;
    public function __construct(LabelService $lService,TestService $tService, QuestionService $qService, QuestionBankService $qbService)
    {
        $this->tService = $tService;
        $this->qService = $qService;
        $this->lService = $lService;
        $this->qbService = $qbService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index($qbID, Request $request)
    {
        $QB = $this->qbService->findOrFail($qbID,"id");
        $tests = $this->tService->getAllPaginated(["questionbanks" => $qbID]);
        $labels = $this->lService->getAll(["questionbanks" => $qbID]);
        return Inertia::render("Test/TestListPage", [
            "QBank" => $QB,
            "tests" => $tests,
            "labels" => $labels,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($qbID)
    {
        //
        // dd($request);
        $QB = $this->qbService->findOrFail($qbID,"id");
        return Inertia::render("Test/AddTest",["QBank" => $QB]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($qbID,Request $request,$testID=null)
    {
        //
        $inserted = $this->tService->create($request->all()+["question_bank_id" => $qbID]);
        if ($inserted) {
            return redirect()->route("tests.index", ["qbID" => $qbID]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($qbID, $testID)
    {
        //
        $QB = $this->qbService->findOrFail($qbID,"id");
        $test = $this->tService->find(["questionbanks" => $qbID, "id" => $testID])->first();
        // $questions = $test->questions()->get();
        $questions = $this->qService->find(["questiontest" => $testID]);
        // dd($questions);
        if(!$test) {
            abort(404);
        }

        return Inertia::render("Test/TestDetail",["QBank" => $QB, "test" => $test, "questions" => $questions]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Test $test)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Test $test)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Test $test)
    {
        //
    }

    // public function createQuestion($qbID, $testID, Request $request)
    // {
    //     //
    //     $QB = $this->qbService->findOrFail($qbID,"id");
    //     $test = $this->tService->find(["questionbanks" => $qbID, "id" => $testID])->first();
    //     $labels = $this->lService->getAll(["questionbanks" => $qbID]);
    //     if(!$test) {
    //         abort(404);
    //     }
    //     return Inertia::render("Test/AddTestQuestion",
    //     ["QBank" => $QB,
    //     "test" => $test,
    //     "labels" => $labels,
    //     "sublabels" => Inertia::lazy(fn() => isset($request["parent"]) ? $this->lService->getAll(["parent" => $request["parent"]]) : [])]);
    // }

    // public function storeQuestion($qbID, $testID, Request $request)
    // {
    //     //
    //     $QB = $this->qbService->findOrFail($qbID,"id");
    //     $test = $this->tService->find(["questionbanks" => $qbID, "id" => $testID])->first();
    //     if(!$test) {
    //         abort(404);
    //     }
    //     $inserted = $this->qService->create($request->all()+["question_bank_id" => $qbID]);
    //     if ($inserted) {
    //         $attachmentResult = $test->questions()->attach($inserted);
    //         return redirect()->route("tests.show", ["qbID" => $qbID, "testID" => $testID]);
    //     }
    // }

    public function indexQuestion($qbID, $testID, Request $request) {
        $QB = $this->qbService->findOrFail($qbID,"id");
        $test = $this->tService->find(["questionbanks" => $qbID, "id" => $testID])->first();
        if(!$test) {
            abort(404);
        }
        $questions = $this->qService->getAllPaginated($request->all()+["questionbanks" => $qbID, "tests"=>["qb" => $qbID, "test"=>$testID]]);
        return Inertia::render("Test/TestQuestionListPage", [
            "QBank" => $QB,
            "test" => $test,
            "questions" => $questions
        ]);
    }

    public function attachQuestion($qbID, $testID, Request $request) {
        $question = $this->qService->findOrFail($request["qID"], "id");
        $test = $this->tService->find(["questionbanks" => $qbID, "id" => $testID])->first();
        if(!$test) {
            abort(404);
        }
        $attachmentResult = $test->questions()->attach($question);
    }

    public function detachQuestion($qbID, $testID, Request $request) {
        $question = $this->qService->findOrFail($request["qID"], "id");
        $test = $this->tService->find(["questionbanks" => $qbID, "id" => $testID])->first();
        if(!$test) {
            abort(404);
        }
        $detachmentResult = $test->questions()->detach($question);
    }

    public function pdfGenerate($qbID, $testID) {
        $QB = $this->qbService->findOrFail($qbID,"id");
        $test = $this->tService->find(["questionbanks" => $qbID, "id" => $testID])->first();
        if(!$test) {
            abort(404);
        }
        $questions = $this->qService->find(["question_test"=>$testID]);
        $data = [
            "test" => $test,
            "questions" => $questions
        ];
        // dd($questions);
        $pdf = PDF::loadView('exampdf',$data);
        return $pdf->download($test->name.'.pdf');
    }

    public function pdfStream($qbID, $testID)
    {
        $QB = $this->qbService->findOrFail($qbID,"id");
        $test = $this->tService->find(["questionbanks" => $qbID, "id" => $testID])->first();
        if(!$test) {
            abort(404);
        }
        $questions = $this->qService->find(["question_test"=>$testID]);
        $data = [
            "test" => $test,
            "questions" => $questions
        ];
        // dd($questions);
        $pdf = LaravelMpdf::loadView('exampdf',$data);
        return $pdf->stream();
    }

    public function randomCreate($qbID)
    {
        //
        // dd($request);
        $QB = $this->qbService->findOrFail($qbID,"id");
        $labels = $this->lService->getAll(["all" => $qbID]);
        return Inertia::render("Test/AddRandomTest",["QBank" => $QB, "labels" => $labels]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function randomStore($qbID,Request $request)
    {
        //

        $inserted = $this->tService->create($request->all()+["question_bank_id" => $qbID]);
        if ($inserted) {
            $questions = $this->qService->getAll(["randSublabels" => [$request["sublabels"],$request["count"]]]);
            return redirect()->route("tests.index", ["qbID" => $qbID]);
        }
    }


}
