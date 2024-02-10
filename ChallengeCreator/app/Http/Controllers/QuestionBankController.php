<?php

namespace App\Http\Controllers;

use App\Http\Services\QuestionBankService;
use App\Models\QuestionBank;
use Illuminate\Http\Request;
use Inertia\Inertia;


class QuestionBankController extends Controller
{
    private QuestionBankService $qbService;

    public function __construct(QuestionBankService $qbService)
    {
        $this->qbService = $qbService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $QBS =  $this->qbService->getAllPaginated();
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
    public function store(Request $request)
    {
        //
        $inserted = $this->qbService->insert($request->all());
        dd($inserted);
    }

    /**
     * Display the specified resource.
     */
    public function show(QuestionBank $questionBank)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(QuestionBank $questionBank)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, QuestionBank $questionBank)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(QuestionBank $questionBank)
    {
        //
    }
}
