<?php

namespace App\Http\Controllers;

use App\Http\Requests\LabelFormRequest;
use App\Http\Services\QuestionBankService;
use App\Http\Services\LabelService;
use App\Models\Label;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LabelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private LabelService $lService;
    private QuestionBankService $qbService;
    public function __construct(QuestionBankService $qbService,LabelService $lService)
    {
        $this->qbService = $qbService;
        $this->lService = $lService;
    }

    public function index($qbID)
    {
        //
        $QB = $this->qbService->findOrFail($qbID,"id");
        $labels = $this->lService->getAllPaginated(["questionbanks" => $qbID]);
        return Inertia::render("Label/LabelIndex", [
            "QBank" => $QB,
            "labels" => $labels
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($qbID)
    {
        //
        $QB = $this->qbService->findOrFail($qbID,"id");
        $labels = $this->lService->getAll(["questionbanks" => $qbID]);
        return Inertia::render("Label/AddLabel",[
            "QBank" => $QB,
            "labels" => $labels
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($qbID,LabelFormRequest $request)
    {
        //
        $inserted = $this->lService->create($request->all()+["question_bank_id" => $qbID]);
        if ($inserted) {
            return redirect()->route("labels.index", ["qbID" => $qbID]);
        }
        else {
            abort(400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($qbID,$label)
    {
        //
        $QB = $this->qbService->findOrFail($qbID,"id");
        $label = $this->lService->findOrFail($label,"id");
        $subLabels = $this->lService->find(["id" => $label, "parent" => $label]);
        return Inertia::render("Label/LabelPage",[
            "QBank"=>$QB,
            "label"=>$label,
            "sublabels"=>$subLabels
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($qbID, $label, Request $request)
    {
        //
        // $QB = $this->qbService->findOrFail($qbID,"id");
        // $label = $this->lService->findOrFail($label,"id");
        // return Inertia::render("Label/LabelPage",[
        //     "QBank"=>$QB,
        //     "label"=>$label
        // ]);
        // $this->lService->update($label, $request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($label,Request $request)
    {
        //
        $this->lService->update($label, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($qbID,$label)
    {
        //
        $deleted = $this->lService->delete($label);
            if($deleted) {
                $QB = $this->qbService->findOrFail($qbID,"id");
                $labels = $this->lService->getAllPaginated(["questionbanks" => $qbID]);
            return Inertia::render("Label/LabelIndex", [
                "QBank" => $QB,
                "labels" => $labels
            ]);
            }
        }
    }
