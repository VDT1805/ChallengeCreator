<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\Request;
use App\Http\Services\QuestionBankService;
use App\Http\Services\TestService;
use Inertia\Inertia;

class TestController extends Controller
{
    private TestService $tService;
    private QuestionBankService $qbService;
    public function __construct(TestService $tService, QuestionBankService $qbService)
    {
        $this->tService = $tService;
        $this->qbService = $qbService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index($qbID)
    {
        $QB = $this->qbService->findOrFail($qbID,"id");
        $tests = $this->tService->getAllPaginated(["questionbanks" => $qbID]);
        return Inertia::render("Test/TestListPage", [
            "QBank" => $QB,
            "tests" => $tests
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($qbID, Request $request)
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
    public function show(Test $test)
    {
        //
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
}
