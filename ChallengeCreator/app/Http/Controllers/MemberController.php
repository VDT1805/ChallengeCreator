<?php

namespace App\Http\Controllers;

use App\Http\Services\MemberService;
use App\Http\Services\QuestionBankService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private QuestionBankService $qbService;
    private MemberService $mService;
    public function __construct(QuestionBankService $qbService, MemberService $mService)
    {
        $this->qbService = $qbService;
        $this->mService = $mService;
    }
    public function index($qbID, Request $request)
    {
        //
        $QB = $this->qbService->findOrFail($qbID,"id");
        $members = $this->mService->getAllPaginated($request->all() + ["questionbanks" => $qbID]);
        // dd($members);
        return Inertia::render("Member/MemberIndex", [
            "QBank" => $QB,
            "members" => $members
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
