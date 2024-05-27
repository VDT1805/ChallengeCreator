<?php

namespace Tests\Feature;

use App\Http\Services\TestService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Services\QuestionBankService;
use App\Http\Services\QuestionService;
use Tests\TestCase;
use App\Models\User;
use App\Models\Role;
use App\Models\Question;
use App\Models\QuestionBank;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Support\Facades\Event;

class TestControllerTest extends TestCase
{
    use RefreshDatabase;
    private QuestionBankService $qbservice;
    private TestService $service;
    private User $user;
    private QuestionBank $questionBank;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->qbservice = new QuestionBankService();
        $this->service = $this->partialMock(QuestionService::class,function ($mock) {
            $mock->shouldReceive('AIgenerate')->andReturn(
                new Collection([
                    new Question([
                        'question' => 'Generated Question 1',
                        'ans1' => 'Generated Answer 1',
                    ]),
                ])
            );
        });
        $this->actingAs($this->user);
        $this->seed();
        $this->questionBank = $this->qbservice->create(["name" => "Test Question Bank"]);
    }

    /**
     * Test the index method.
     *
     * @return void
     */
    public function testIndex(): void
    {
        $tests = $this->service->createMany([

            [
                'question_bank_id' => $this->questionBank->id,
                'name' => 'Test1',
            ],
            [
                'question_bank_id' => $this->questionBank->id,
                'name' => 'Test2',
            ],
            [
                'question_bank_id' => $this->questionBank->id,
                'name' => 'Test3',
            ],

        ]

        );

        $response = $this->get('qbs/1/tests');

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) =>
            $page->component('Questions/TestListPage') -> has(
                'tests.data', 3
            )
        );
    }

    /**
     * Test the create method.
     *
     * @return void
     */
    public function testCreate(): void
    {

        $response = $this->actingAs($this->user)
            ->get(route('tests.create', ['qbID' => $this->questionBank->id]));

            $response->assertStatus(200);
            $response->assertInertia(
                fn (Assert $page) =>
                $page->component('Questions/AddQuestion') -> where(
                    'QBank.id', $this->questionBank->id
                )
            );
    }

    public function testCreate_with_test_failure(): void
    {

        $response = $this->actingAs($this->user)
            ->get(route('tests.create', ['qbID' => $this->questionBank->id]));

            $response->assertStatus(404);
    }

    /**
     * Test the store method.
     *
     * @return void
     */
    public function testStore(): void
    {
        Event::fake();
        $data = [
            'question_bank_id' => $this->questionBank->id,
            'question' => 'Test Question',
            'ans1' => 'Answer 1',
            'ans2' => 'Answer 2',
            'ans3' => 'Answer 3',
            'ans4' => 'Answer 4',
            'ans5' => 'Answer 5',
            'ans6' => 'Answer 6',
            'correct' => 1,
            'label_id' => 1,
        ];

        $response = $this->post(route('questions.store', ['qbID' => $this->questionBank->id]), $data);

        $response->assertRedirect(route('questions.index', ['qbID' => $this->questionBank->id]));
    }

    public function testStore_missing_question_field_failure(): void
    {
        //Mising name field
        $data = [
            'question_bank_id' => $this->questionBank->id,
        ];

        $response = $this->post(route('questions.store', ['qbID' => $this->questionBank->id]), $data);

        $response->assertStatus(302);
        $response->assertSessionHasErrors('question');
    }

    public function testEdit(): void
    {
        $data = [
            'question_bank_id' => $this->questionBank->id,
            'question' => 'Test Question',
            'ans1' => 'Answer 1',
            'ans2' => 'Answer 2',
            'ans3' => 'Answer 3',
            'ans4' => 'Answer 4',
            'ans5' => 'Answer 5',
            'ans6' => 'Answer 6',
            'correct' => 1,
            'label_id' => 1,
        ];
        $question = $this->service->create($data);

        $response = $this->get(route('questions.edit', ['qbID' => $this->questionBank->id, 'qID' => $question->id]));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) =>
            $page->component('Questions/QuestionForm')->where(
                'question.id', $question->id
            )
        );
    }

    public function testUpdate(): void
    {
        Event::fake();

        $data = [
            'question_bank_id' => $this->questionBank->id,
            'question' => 'Test Question',
            'ans1' => 'Answer 1',
            'ans2' => 'Answer 2',
            'ans3' => 'Answer 3',
            'ans4' => 'Answer 4',
            'ans5' => 'Answer 5',
            'ans6' => 'Answer 6',
            'correct' => 1,
            'label_id' => 1,
        ];
        $question = $this->service->create($data);

        $response = $this->put(route('questions.update', ['qbID' => $this->questionBank->id, 'qID' => $question->id]), $data);

        $response->assertRedirect(route('questions.index', ['qbID' => $this->questionBank->id]));
    }

    public function testDestroy(): void
    {
        $data = [
            'question_bank_id' => $this->questionBank->id,
            'question' => 'Test Question',
            'ans1' => 'Answer 1',
            'ans2' => 'Answer 2',
            'ans3' => 'Answer 3',
            'ans4' => 'Answer 4',
            'ans5' => 'Answer 5',
            'ans6' => 'Answer 6',
            'correct' => 1,
            'label_id' => 1,
        ];
        $question = $this->service->create($data);

        $response = $this->delete(route('questions.destroy', ['qbID' => $this->questionBank->id, 'qID' => $question->id]));

        $response->assertRedirect(route('questions.index', ['qbID' => $this->questionBank->id]));
        $this->assertDatabaseCount('questions', 0);
    }
}
