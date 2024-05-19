<?php

namespace Tests\Unit;

use App\Http\Services\ClientResponse;
use App\Http\Services\HTTPService;
use App\Http\Services\QuestionService;
use App\Models\QuestionBank;
use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Http\Services\QuestionBankService;
use App\Models\Question;
use App\Models\Role;
use Illuminate\Foundation\Testing\DatabaseMigrations;
class QuestionServiceTest extends TestCase
{
    use withFaker,RefreshDatabase;
    private QuestionService $service;
    private HTTPService $client;
    private User $user;
    private QuestionBank $qb;
    private QuestionBankService $qbservice;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        $this->client = $this->createMock(HTTPService::class);
        $this->service = new QuestionService($this->client,app('config'));
        $this->qbservice = new QuestionBankService();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
        $this->qb = $this->qbservice->create([
            "name" => $this->faker->name
        ]);
    }
    public function testGetAllPaginated(): void
    {
        $search = [];
        $pageSize = 15;
        $result = $this->service->getAllPaginated($search, $pageSize);

        $this->assertInstanceOf(LengthAwarePaginator::class, $result);
    }

    public function testGetAll(): void
    {
        $search = [];
        $result = $this->service->getAll($search);

        $this->assertInstanceOf(Collection::class, $result);
    }

    public function testCount(): void
    {
        $search = [];
        $result = $this->service->count($search);

        $this->assertIsInt($result);
    }

    public function testFindOrFail(): void
    {
        $data = [
            "question" => $this->faker->name,
            "ans1" => $this->faker->name,
            "ans2" => $this->faker->name,
            "ans3" => $this->faker->name,
            "ans4" => $this->faker->name,
            "ans5" => $this->faker->name,
            "ans6" => $this->faker->name,
            "correct" => 1,
            "question_bank_id" => $this->qb->id,
            "label_id" => $this->qb->labels()->first()->id
        ];
        $result = $this->service->create($data);
        $key = 1;
        $column = 'id';
        $result = $this->service->findOrFail($key, $column);

        $this->assertInstanceOf(Model::class, $result);
    }

    public function testFind(): void
    {
        $attributes = [];
        $result = $this->qbservice->find($attributes);

        $this->assertInstanceOf(Collection::class, $result);
    }

    public function testCreate(): void
    {
        $data = [
            "question" => $this->faker->name,
            "ans1" => $this->faker->name,
            "ans2" => $this->faker->name,
            "ans3" => $this->faker->name,
            "ans4" => $this->faker->name,
            "ans5" => $this->faker->name,
            "ans6" => $this->faker->name,
            "correct" => 1,
            "question_bank_id" => $this->qb->id,
            "label_id" => $this->qb->labels()->first()->id
        ];
        $result = $this->service->create($data);

        $this->assertInstanceOf(Model::class, $result);
    }

    public function testInsert(): void
    {
        $data = [
            "question" => $this->faker->name,
            "ans1" => $this->faker->name,
            "ans2" => $this->faker->name,
            "ans3" => $this->faker->name,
            "ans4" => $this->faker->name,
            "ans5" => $this->faker->name,
            "ans6" => $this->faker->name,
            "correct" => 1,
            "label_id" => $this->qb->labels()->first()->id,
            "question_bank_id" => $this->qb->id
        ];
        $result = $this->service->insert($data);

        $this->assertTrue($result);
    }

    public function testCreateMany(): void
    {
        $attributes = [
        [
            "question" => $this->faker->name,
            "ans1" => $this->faker->name,
            "ans2" => $this->faker->name,
            "ans3" => $this->faker->name,
            "ans4" => $this->faker->name,
            "ans5" => $this->faker->name,
            "ans6" => $this->faker->name,
            "correct" => 1,
            "question_bank_id" => $this->qb->id,
            "label_id" => $this->qb->labels()->first()->id
        ],
        [
            "question" => $this->faker->name,
            "ans1" => $this->faker->name,
            "ans2" => $this->faker->name,
            "ans3" => $this->faker->name,
            "ans4" => $this->faker->name,
            "ans5" => $this->faker->name,
            "ans6" => $this->faker->name,
            "correct" => 1,
            "question_bank_id" => $this->qb->id,
            "label_id" => $this->qb->labels()->first()->id
        ]
    ];
        $result = $this->service->createMany($attributes);
        $this->assertEquals(2, $result->count());
        $this->assertInstanceOf(Collection::class, $result);

    }

    public function testUpdate(): void
    {
        $data = [
            "question" => $this->faker->name,
            "ans1" => $this->faker->name,
            "ans2" => $this->faker->name,
            "ans3" => $this->faker->name,
            "ans4" => $this->faker->name,
            "ans5" => $this->faker->name,
            "ans6" => $this->faker->name,
            "correct" => 1,
            "question_bank_id" => $this->qb->id,
            "label_id" => $this->qb->labels()->first()->id
        ];
        $newquestion = $this->service->create($data);

        $keyOrModel = $newquestion->id;
        $data = [
            "question" => "Updated question",
            "ans1" => $this->faker->name,
            "ans2" => $this->faker->name,
            "ans3" => $this->faker->name,
            "ans4" => $this->faker->name,
            "ans5" => $this->faker->name,
            "ans6" => $this->faker->name,
            "correct" => 1,
            "question_bank_id" => $this->qb->id,
            "label_id" => $this->qb->labels()->first()->id
        ];
        $result = $this->service->update($keyOrModel, $data);

        $this->assertInstanceOf(Model::class, $result);
        $this->assertEquals($data['question'], $result->question);
    }

    public function testDelete(): void
    {
        $data = [
            "question" => $this->faker->name,
            "ans1" => $this->faker->name,
            "ans2" => $this->faker->name,
            "ans3" => $this->faker->name,
            "ans4" => $this->faker->name,
            "ans5" => $this->faker->name,
            "ans6" => $this->faker->name,
            "correct" => 1,
            "question_bank_id" => $this->qb->id,
            "label_id" => $this->qb->labels()->first()->id
        ];
        $newquestion = $this->service->create($data);
        $keyOrModel = 1;
        $result = $this->service->delete($keyOrModel);

        $this->assertTrue($result);
    }

    public function test_ai_generate(): void
    {
        $rq = [
            "answers" => [
                "answer1",
                "answer2",
            ] ,
            "context" => "test",
            "num_of_q" => 2
        ];
        // create mock api response
        $uploadSuccessfulResponse = new ClientResponse();
        $uploadSuccessfulResponse->responseSuccess = true;
        $uploadSuccessfulResponse->data = [
            [
                "question" => "question 1",
                "ans1" => "answer1"
            ],
            [
                "question" => "question 1",
                "ans1" => "answer1"
            ]
            ];
        $this->client->method('setContentType')->willReturnSelf();
        $this->client->method('post')->willReturn($uploadSuccessfulResponse);

        $result = $this->service->AIgenerate($rq,$this->qb->id,$this->qb->labels()->first()->id);
        $this->assertInstanceOf(Collection::class, $result);
        $this->assertEquals(2, $result->count());
    }
}
