<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuestionRequest;
use App\Http\Services\QuestionBankService;
use App\Http\Services\QuestionService;
use App\Http\Services\TestService;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    private QuestionService $qService;
    private QuestionBankService $qbService;
    private TestService $tService;
    public function __construct(QuestionService $qService,TestService $tService, QuestionBankService $qbService)
    {
        $this->qService = $qService;
        $this->tService = $tService;
        $this->qbService = $qbService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index($qbID)
    {
        $QB = $this->qbService->findOrFail($qbID,"id");
        $questions = $this->qService->getAllPaginated(["questionbanks" => $qbID]);
        return Inertia::render("Questions/QuestionListPage", [
            "QBank" => $QB,
            "questions" => $questions
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($qbID, QuestionRequest $request, $testID=null)
    {
        //

        // dd($request);
        $QB = $this->qbService->findOrFail($qbID,"id");
        return Inertia::render("Questions/AddQuestion",["QBank" => $QB]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($qbID,Request $request)
    {
        //Test ID can be here!!!
        $inserted = $this->qService->create($request->all()+["question_bank_id" => $qbID]);
        if ($inserted) {
            return redirect()->route("questions.index", ["qbID" => $qbID]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        //
    }
}
