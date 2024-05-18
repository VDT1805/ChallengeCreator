<?php

namespace Tests\Unit;


use App\Http\Services\QuestionService;
use App\Models\QuestionBank;
use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Http\Services\QuestionBankService;
use App\Models\Role;
use Illuminate\Foundation\Testing\DatabaseMigrations;
class QuestionServiceTest extends TestCase
{
    use withFaker,RefreshDatabase;
    private QuestionService $service;
    private User $user;
    private QuestionBank $qb;
    private QuestionBankService $qbservice;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        $this->service = new QuestionService();
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
        $questionService = new QuestionService();
        $search = [];
        $result = $questionService->getAll($search);

        $this->assertInstanceOf(Collection::class, $result);
    }

    public function testCount(): void
    {
        $questionService = new QuestionService();
        $search = [];
        $result = $questionService->count($search);

        $this->assertIsInt($result);
    }

    public function testFindOrFail(): void
    {
        $questionService = new QuestionService();
        $key = 1;
        $column = 'id';
        $result = $questionService->findOrFail($key, $column);

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

        $this->assertInstanceOf(Collection::class, $result);
    }

    public function testUpdate(): void
    {
        $questionService = new QuestionService();
        $keyOrModel = 1;
        $data = [];
        $result = $questionService->update($keyOrModel, $data);

        $this->assertInstanceOf(Model::class, $result);
    }

    public function testDelete(): void
    {
        $questionService = new QuestionService();
        $keyOrModel = 1;
        $result = $questionService->delete($keyOrModel);

        $this->assertTrue($result);
    }
}
