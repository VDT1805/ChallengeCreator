<?php

namespace App\Http\Controllers;

use App\Events\QuestionCreated;
use App\Http\Requests\QuestionRequest;
use App\Http\Services\LabelService;
use App\Http\Services\QuestionBankService;
use App\Http\Services\QuestionService;
use App\Http\Services\TestService;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Events\QuestionEvent;
use App\Http\Requests\QuestionFormRequest;
use App\Http\Services\HTTPService;

class QuestionController extends Controller
{
    private QuestionService $qService;
    private QuestionBankService $qbService;
    private TestService $tService;
    private LabelService $lService;

    public function __construct(
    QuestionService $qService,
    TestService $tService,
    QuestionBankService $qbService,
    LabelService $lService)
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
        // $questions = $this->qService->getAllPaginated($request->all()+["questionbanks" => $qbID]);
        // dd($questions);
        $labels = $this->lService->getAll(["questionbanks" => $qbID]);
        return Inertia::render("Questions/QuestionListPage", [
            "QBank" => $QB,
            "questions" => fn() => $this->qService->getAllPaginated($request->all()+["questionbanks" => $qbID]),
            "labels" => $labels,
            "sublabels" => fn() => $parentid ? $this->lService->getAll(["parent" => $parentid]) : [],
            "CanCreate" => Auth::user()->hasPermission('question-create',$qbID)
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($qbID, Request $request)
    {
        // dd($request);
        $QB = $this->qbService->findOrFail($qbID,"id");
        $testid = $request["testid"];
        if ($testid)
        {
            $test = $this->tService->find(["questionbanks" => $qbID,"id" => (string) $testid])->first();
            // dd($test);
            if (!$test) {
                abort(404);
            }
        }
        $labels = $this->lService->getAll(["questionbanks" => $qbID]);
        return Inertia::render("Questions/AddQuestion",["QBank" => $QB,
        "labels" => $labels,
        "sublabels" => fn() => isset($request["labels"]) ? $this->lService->getAll(["parent" => $request->labels]) : []]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($qbID,QuestionFormRequest $request)
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
                return redirect()->route("tests.show", ["qbID" => $qbID, "testID" => $testid]);
            }
        }
        if ($inserted) {
            QuestionEvent::dispatch($inserted,Auth::user()->name,"Created");
            return redirect()->route("questions.index", ["qbID" => $qbID]);
        }
        else {
            abort(400, "Cannot save this question");
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
    public function update($qbID,$qID,QuestionFormRequest $request)
    {
        $updated = $this->qService->update($qID, $request->all());
        QuestionEvent::dispatch($updated,Auth::user()->name,"Updated");
        return redirect()->route("questions.index", ["qbID" => $qbID]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($qbID,Request $request)
    {
            $target = $this->qService->find(["id" => $request["qID"]])->first();
            // dd($target);
            $deleted = $this->qService->delete($target);

            if($deleted) {
                // QuestionEvent::dispatch($target,Auth::user()->name,"Deleted");
                return redirect()->route("questions.index", ["qbID" => $qbID]);
            }
            else {
                abort(400);
            }
    }

    public function AIcreate($qbID) {
        $QB = $this->qbService->findOrFail($qbID,"id");
        return Inertia::render("Questions/AddAIQuestion",["QBank" => $QB]);
    }

    public function AIgen($qbID, Request $request) {
        // dd($request->all());
        $QB = $this->qbService->findOrFail($qbID,"id");
        $label = $this->lService->find(["sublabel" => ["Generic Parent","Generic",$qbID]])->first();
        // $response = $this->aiService->
        // setContentType(HttpService::CONTENT_TYPE_JSON)
        // ->post('/genqa',[
        //     "answers" => (collect($request["answers"]))->map(function($answer) {
        //         return $answer["text"];
        //     }) ,
        //     "context" => $request["context"],
        //     "num_of_q" => $request["numberofquestions"]
        // ]);
        // $data =  $response->getData();
        // // dd($data);
        // if (!$response->isSuccessful()) {
        //     abort(403,"Failed to reach API");
        // }
        // $questions = [];
        // foreach ($data as $question) {
        //     $questions[] = new Question([
        //         "question" => $question["question"],
        //         "ans1" => $question["ans1"],
        //         "ans2" => "",
        //         "ans3" => "",
        //         "ans4" => "",
        //         "ans5" => "",
        //         "ans6" => "",
        //         "question_bank_id" => $qbID,
        //         "correct" => 1,
        //         "label_id" => $label['id']
        //     ]);
        // }
        $rq = [
                "answers" => (collect($request["answers"]))->map(function($answer) {
                    return $answer["text"];
                }) ,
                "context" => $request["context"],
                "num_of_q" => $request["numberofquestions"]
            ];
        $questions = $this->qService->AIgenerate($rq,$qbID,$label['id']);
        return Inertia::render("Questions/AddAIQuestion",
        ["QBank" => $QB,
        "questions" => $questions]);
    }

    public function AIstore($qbID, Request $request) {
        $questions = $request["questions"];
        // dd($questions);
        $inserted = $this->qService->createMany($questions);
        if ($inserted) {
            return redirect()->route("questions.index", ["qbID" => $qbID]);
        }
    }
}
