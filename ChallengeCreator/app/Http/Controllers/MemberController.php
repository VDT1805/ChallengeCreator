<?php

namespace App\Http\Controllers;

use App\Http\Services\MemberService;
use App\Http\Services\QuestionBankService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;

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
        $editorURL = URL::temporarySignedRoute(
            'members.store', now()->addMinutes(30)
            ,["qbID" => $qbID,"role" => "editor"]
            ,absolute:true
        );
        $viewerURL = URL::temporarySignedRoute(
            'members.store', now()->addMinutes(30)
            ,["qbID" => $qbID,"role" => "viewer"]
            ,absolute:true
        );
        // dd($members);
        return Inertia::render("Member/MemberIndex", [
            "QBank" => $QB,
            "members" => $members,
            "editorURL" => $editorURL,
            "viewerURL" => $viewerURL
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($qbID, Request $request)
    {
        //
        // $QB = $this->qbService->findOrFail($qbID,"id");

        // if (!$QB) {
        //     abort(404);
        // }
        // $inviteURL = URL::temporarySignedRoute(
        //     'members.store', now()->addMinutes($request["time"])
        //     ,["qbID" => $qbID,"role" => $request["role"]]
        //     ,absolute:true
        // );
        // return Inertia::render("Member/InviteMemberForm", [
        //     "QBank" => $QB,
        //     "inviteURL" => $inviteURL
        // ]);
        //
        if (! $request->hasValidSignature()) {
            abort(403);
        }
        $QB = $this->qbService->findOrFail($qbID,"id");
        $res = $this->mService->create(["qb" => $QB, "role" => $request["role"]]);
        if($res) {
            return redirect()->route("questionbanks.show", ["qbID"=>$QB->id]);
        }
        else {
            abort(404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($qbID,Request $request)
    {
        //
        // if (! $request->hasValidSignature()) {
        //     abort(403);
        // }
        // $QB = $this->qbService->findOrFail($qbID,"id");
        // $res = $this->mService->insert(["qb" => $QB, "role" => $request["role"]]);
        // if($res) {
        //     return redirect()->route("questionbanks.show", ["qbID"=>$QB->id]);
        // }
        // else {
        //     abort(403);
        // }

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
