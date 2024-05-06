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
use FontLib\TrueType\Collection;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Mccarlosen\LaravelMpdf\Facades\LaravelMpdf;
use Gotenberg\Gotenberg;
use Gotenberg\Stream;
use Gotenberg\Exceptions\GotenbergApiErrored;
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
    public function store($qbID,Request $request)
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
    public function destroy($qbID,$tID, Request $request)
    {
        //
        $target = $this->tService->find(["id" => $tID])->first();
        // dd($target);
        $deleted = $this->tService->delete($target);
        if($deleted) {
            return redirect()->route("tests.index", ["qbID" => $qbID]);
        }
        else {
            abort(400);
        }

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

    public function pdfGenerate($qbID, $testID, Request $request) {
        $QB = $this->qbService->findOrFail($qbID,"id");
        $test = $this->tService->find(["questionbanks" => $qbID, "id" => $testID])->first();
        if(!$test) {
            abort(404);
        }
        $settings = $request->all();
        $questions = $this->qService->find(["question_test"=>$testID]);
        $questions_bags = [];
        if($settings["quesmix"]) {
            for($i = 0; $i < $settings["numcopies"]; $i++) {
                $newbag = $questions->shuffle();
                $questions_bags[] = $newbag;
            }
        }
        else {
            $questions_bags[] = $questions;
        }
        $data = [
            "test" => $test,
            "questions_bag" => $questions_bags,
            "settings" => $settings
        ];

        $html = view('exampdf',$data)->render();
        // dd($html);
        $request = Gotenberg::chromium("http://localhost:3000/")
        ->pdf()->html(Stream::string('index.html',$html));
        $client = new \Http\Adapter\Guzzle7\Client;
        try {
            $response = $client->sendRequest($request);
            return $response->getBody();
        } catch (GotenbergApiErrored $e) {
            dd($e->getMessage());
        }
    }

    public function pdfSettings($qbID, $testID)
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
        $QB = $this->qbService->findOrFail($qbID,"id");
        $labels = $this->lService->getAll(["all" => $qbID]);
        return Inertia::render("Test/AddRandomTestQuestion",["QBank" => $QB, "labels" => $labels]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function randomStore($qbID,Request $request)
    {
        // dd($request);
        $name = $request["name"];
        unset($request["name"]);
        $questions = collect([]);
        $inserted = $this->tService->create(["question_bank_id" => $qbID, "name" => $name]);
        $QB = $this->qbService->findOrFail($qbID,"id");
        if ($inserted) {
            foreach($request->all() as $key => $value) {
                $questions_query = $this->qService->getAll(["randSublabels" => [$key,$value]]);
                $questions = $questions->concat($questions_query);
            }
            // dd($questions);
            foreach($questions as $question) {
                $inserted->questions()->attach($question);
            }
            return Inertia::render("Test/TestDetail",["QBank" => $QB, "test" => $inserted, "questions" => $questions]);
        }
    }


}
