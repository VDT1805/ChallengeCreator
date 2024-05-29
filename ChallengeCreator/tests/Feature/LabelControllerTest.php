<?php

namespace Tests\Feature;
use App\Http\Services\QuestionBankService;
use App\Http\Services\QuestionService;
use App\Models\User;
use App\Models\Label;
use App\Models\QuestionBank;
use App\Http\Services\LabelService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert; 
use Tests\TestCase;

class LabelControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    use RefreshDatabase;
    private QuestionBankService $qbservice;
    private LabelService $service;
    private User $user;
    private QuestionBank $questionBank;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->qbservice = new QuestionBankService();
        $this->service = new LabelService();
        $this->actingAs($this->user);
        $this->seed();
        $this->questionBank = $this->qbservice->create(["name" => "Test Question Bank"]);
    }
    public function testIndex(): void
    {
        $tests = $this->service->createMany([

            [
                'question_bank_id' => $this->questionBank->id,
                'name' => 'Label1',
                'description' => 'Test1 Description'
            ],
            [
                'question_bank_id' => $this->questionBank->id,
                'name' => 'Label2',
                'description' => 'Test1 Description'
            ],
            [
                'question_bank_id' => $this->questionBank->id,
                'name' => 'Label3',
                'description' => 'Test1 Description'
            ],

        ]

        );

        $response = $this->get('qbs/1/labels');

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) =>
            $page->component('Label/LabelIndex') -> has(
                'labels.data', 4
            )
        );
        $response->assertInertia(
            fn (Assert $page) =>
            $page->component('Label/LabelIndex') -> has(
                'labels.data.0.sublabels', 1
            )
        );
    }

    public function testCreate(): void
    {

        $response = $this->actingAs($this->user)
            ->get(route('labels.create', ['qbID' => $this->questionBank->id]));

            $response->assertStatus(200);
            $response->assertInertia(
                fn (Assert $page) =>
                $page->component('Label/AddLabel') -> where(
                    'QBank.id', $this->questionBank->id
                )
            );
    }

    public function testStore(): void
    {
        $data = [
            'question_bank_id' => $this->questionBank->id,
            'name' => 'Label1',
            'description' => 'Test1 Description'
        ];

        $response = $this->post(route('labels.store', ['qbID' => $this->questionBank->id]), $data);

        $response->assertRedirect(route('labels.index', ['qbID' => $this->questionBank->id]));
    }

    public function testStore_missing_name_field_failure(): void
    {
        //Mising name field
        $data = [
            'question_bank_id' => $this->questionBank->id,
        ];

        $response = $this->post(route('tests.store', ['qbID' => $this->questionBank->id]), $data);

        $response->assertStatus(302);
        $response->assertSessionHasErrors('name');
    }

    public function testDestroy(): void
    {
        $data = [
            'question_bank_id' => $this->questionBank->id,
            'name' => 'Label1',
            'description' => 'Test1 Description'
        ];
        $label = $this->service->create($data);

        $response = $this->delete(route('labels.destroy', ['qbID' => $this->questionBank->id, 'label' => $label->id]));

        // $response->assertRedirect(route('labels.index', ['qbID' => $this->questionBank->id]));
        $response->assertInertia(
            fn (Assert $page) =>
            $page->component('Label/LabelIndex') -> has(
                'labels.data', 1
            )
        );
    }

    // public function testFind(): void
    // {
    //     $data = [[
    //         'question_bank_id' => $this->questionBank->id,
    //         'name' => 'Test',
    //     ],
    //     [
    //         'question_bank_id' => $this->questionBank->id,
    //         'name' => 'Testa',
    //     ],
    //     [
    //         'question_bank_id' => $this->questionBank->id,
    //         'name' => 'Testb']
    //     ];
    //     $tests = $this->service->createMany($data);

    //     $response = $this->get('qbs/1/tests?keyword=a');

    //     $response->assertStatus(200);
    //     $response->assertInertia(
    //         fn (Assert $page) =>
    //         $page->component('Test/TestListPage') -> has(
    //             'tests.data', 1
    //         )
    //     );
    // }
}
