<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateQBRequest;
use App\Http\Services\LabelService;
use App\Http\Services\QuestionBankService;
use App\Models\QuestionBank;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class QuestionBankController extends Controller
{
    private QuestionBankService $qbService;
    private LabelService $lService;
    public function __construct(QuestionBankService $qbService,LabelService $lService)
    {
        $this->qbService = $qbService;
        $this->lService = $lService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $QBS =  $this->qbService->getAllPaginated();
        // dd($QBS);
        return Inertia::render(
            "Dashboard",
            ["QBS" => $QBS]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render(
            "QuestionBank/AddQuestionBank"
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateQBRequest $request):RedirectResponse
    {
        //
        $inserted = $this->qbService->create($request->all());
        if ($inserted) {
            $parent = $this->lService->create(
            [
                "name" => "Generic Parent",
                "description" => "Generic default",
                "question_bank_id" => $inserted->id
            ]);
            $child = $this->lService->create(
            [
                    "name" => "Generic",
                    "description" => "Generic sublabel",
                    "label_id" => $parent->id,
                    "question_bank_id" => $inserted->id
            ]);
            return redirect()->route("questionbanks.show", ["qbID"=>$inserted->id]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($qbID)
    {
        //
        // dd($qbID);
        $QB = $this->qbService->findOrFail($qbID,"id");

        return Inertia::render(
            "QuestionBank/QuestionBankPage",
            ["QBank" => $QB, "CanEdit" => Auth::user()->hasPermission('questionbank-update',$qbID)]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($qbID)
    {
        //
        $QB = $this->qbService->findOrFail($qbID,"id");
        return Inertia::render(
            "Settings",["QBank" => $QB, "CanEdit" => Auth::user()->hasPermission('questionbank-update',$qbID)]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CreateQBRequest $request, $qbID)
    {
        //
        $this->qbService->update($qbID, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($qbID)
    {
        //
        $QBS =  $this->qbService->getAllPaginated();

        $deleted = $this->qbService->delete($qbID);
        if($deleted) {
            return redirect()->route("questionbanks.index");
        }
        else{dd("Error");}
    }
}
