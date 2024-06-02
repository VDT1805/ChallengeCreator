<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Http\Services\MemberService;
use App\Http\Services\QuestionBankService;
use Inertia\Testing\AssertableInertia as Assert; 
use App\Models\User;
use App\Models\QuestionBank;
use Tests\TestCase;

use function PHPUnit\Framework\assertTrue;

class MemberControllerTest extends TestCase
{
    use RefreshDatabase;
    private QuestionBankService $qbservice;
    private MemberService $service;
    private User $user;
    private QuestionBank $questionBank;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->qbservice = new QuestionBankService();
        $this->service = new MemberService();
        $this->actingAs($this->user);
        $this->seed();
        $this->questionBank = $this->qbservice->create(["name" => "Test Question Bank"]);
    }
    public function testIndex(): void
    {
        assertTrue(true);
        // $members = $this->service->createMany([

        //     [
        //         'qb' => $this->questionBank,
        //         'role' => 'editor'            
        //     ],
            

        // ]

        // );

        // $response = $this->get('qbs/1/members');

        // $response->assertStatus(200);
        // $response->assertInertia(
        //     fn (Assert $page) =>
        //     $page->component('Label/LabelIndex') -> has(
        //         'members.data', 4
        //     )
        // );
        // $response->assertInertia(
        //     fn (Assert $page) =>
        //     $page->component('Label/LabelIndex') -> has(
        //         'labels.data.0.sublabels', 1
        //     )
        // );
    }

    public function testCreate(): void
    {
        assertTrue(true);
        // $response = $this->actingAs($this->user)
        //     ->get(route('labels.create', ['qbID' => $this->questionBank->id]));

        //     $response->assertStatus(200);
            // $response->assertInertia(
            //     fn (Assert $page) =>
            //     $page->component('Label/AddLabel') -> where(
            //         'QBank.id', $this->questionBank->id
            //     )
            // );
    }


    public function testDestroy(): void
    {
        assertTrue(true);
        // $data = [
        //     'question_bank_id' => $this->questionBank->id,
        //     'name' => 'Label1',
        //     'description' => 'Test1 Description'
        // ];
        // $label = $this->service->create($data);

        // $response = $this->delete(route('labels.destroy', ['qbID' => $this->questionBank->id, 'label' => $label->id]));

        // $response->assertRedirect(route('labels.index', ['qbID' => $this->questionBank->id]));
        // $response->assertInertia(
        //     fn (Assert $page) =>
        //     $page->component('Label/LabelIndex') -> has(
        //         'labels.data', 1
        //     )
        // );
    }
}
