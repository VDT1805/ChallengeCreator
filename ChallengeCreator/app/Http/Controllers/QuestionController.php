<?php

namespace App\Http\Controllers;

use App\Events\QuestionCreated;
use App\Http\Requests\QuestionRequest;
use App\Http\Services\LabelService;
use App\Http\Services\QuestionBankService;
use App\Http\Services\QuestionService;
use App\Http\Services\TestService;
use App\Models\Question;
use App\Models\QuestionBank;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Events\QuestionEvent;
class QuestionController extends Controller
{
    private QuestionService $qService;
    private QuestionBankService $qbService;
    private TestService $tService;
    private LabelService $lService;
    public function __construct(QuestionService $qService,TestService $tService, QuestionBankService $qbService,LabelService $lService)
    {
        $this->qService = $qService;
        $this->tService = $tService;
        $this->qbService = $qbService;
        $this->lService = $lService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index($qbID, Request $request)
    {
        $parentid = $request["labels"];
        $QB = $this->qbService->findOrFail($qbID,"id");
        $questions = $this->qService->getAllPaginated($request->all()+["questionbanks" => $qbID]);
        // dd($questions);
        $labels = $this->lService->getAll(["questionbanks" => $qbID]);
        return Inertia::render("Questions/QuestionListPage", [
            "QBank" => $QB,
            "questions" => $questions,
            "labels" => $labels,
            "sublabels" => fn() => $parentid ? $this->lService->getAll(["parent" => $parentid]) : []
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($qbID, Request $request)
    {
        // dd($request);
        $QB = $this->qbService->findOrFail($qbID,"id");
        $labels = $this->lService->getAll(["questionbanks" => $qbID]);
        return Inertia::render("Questions/AddQuestion",["QBank" => $QB,
        "labels" => $labels,
        "sublabels" => fn() => isset($request["labels"]) ? $this->lService->getAll(["parent" => $request->labels]) : []]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($qbID,Request $request)
    {
        $testid = $request["testid"];
        unset($request["testid"]);
        $inserted = $this->qService->create($request->all()+["question_bank_id" => $qbID]);
        if ($testid)
        {
            $test = $this->tService->find(["questionbanks" => $qbID,"id" => (string) $testid])->first();
            // dd($test);
            if (!$test) {
                abort(404);
            }
            if ($inserted) {
                $attachmentResult = $test->questions()->attach($inserted);
                QuestionEvent::dispatch($inserted,Auth::user()->name,"Created");
                return redirect()->route("questions.index", ["qbID" => $qbID]);
            }
        }
        if ($inserted) {
            QuestionEvent::dispatch($inserted,Auth::user()->name,"Created");
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
    public function edit($qbID, $qID, Request $request)
    {

        $QB = $this->qbService->findOrFail($qbID,"id");
        $question = $this->qService->findOrFail($qID,"id");
        $labels = $this->lService->getAll(["questionbanks" => $qbID]);
        $currSublabel = $this->lService->findOrFail($question->label_id,"id");
        $currLabel = $this->lService->findOrFail($currSublabel->label_id,"id");
        return Inertia::render("Questions/QuestionForm",[
            "QBank"=>$QB,
            "question"=>$question,
            "labels" => $labels,
            "currLabel" => $currLabel,
            "currSublabel" => $currSublabel,
            "sublabels" => fn() => isset($request["parent"]) ?
            $this->lService->getAll(["questionbanks" => $qbID, "parent" => $request->parent]) :
            $this->lService->getAll([ "parent" => $currLabel->id])]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($qbID,$qID,Request $request)
    {
        $this->qService->update($qID, $request->all());
        return redirect()->route("questions.index", ["qbID" => $qbID]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($qbID, Request $request)
    {
            $deleted = $this->qService->delete($request["qID"]);
            if($deleted) {
                $QB = $this->qbService->findOrFail($qbID,"id");
                $labels = $this->lService->getAll(["questionbanks" => $qbID]);
                $questions = $this->qService->getAllPaginated(["questionbanks" => $qbID]);
            return Inertia::render("Questions/QuestionListPage", [
                "QBank" => $QB,
                "questions" => $questions,
                "labels" => $labels,
                "sublabels" => fn() => isset($request["labels"]) ? $this->lService->getAll(["parent" => $request->labels]) : []
            ]);

        }
        else {
            abort(400);
        }
    }
}
