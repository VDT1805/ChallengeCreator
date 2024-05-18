<?php

namespace Tests\Unit;

use App\Http\Services\QuestionBankService;
use Tests\TestCase;
use App\Models\User;
use App\Models\Role;
use App\Models\QuestionBank;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class QuestionBankServiceTest extends TestCase
{
    use withFaker,RefreshDatabase;
    /**
     * A basic unit test example.
     */
    private QuestionBankService $service;
    private User $user;
    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->service = new QuestionBankService();
        $this->actingAs($this->user);
        $this->seed();
    }

    public function testGetServiceName()
    {
        $this->assertEquals(
            QuestionBankService::NAME,
            $this->service->getName()
        );
    }

    public function testCreate()
    {

        $data = [
            "name" => $this->faker->name
        ];

        $model = $this->service->create($data);

        $this->assertInstanceOf(QuestionBank::class, $model);
        $this->assertDatabaseHas('question_banks', $data);
        $this->assertTrue($this->user->hasRole('owner', $model));
    }

    public function testUpdate()
    {
        $data = [
            'name' => 'Test Question Bank',
        ];

        $user = User::factory()->create();
        $role = Role::create(['name' => 'owner']);
        Auth::login($user);

        $saved = $this->service->insert($data);

        $this->assertTrue($saved);
        $this->assertDatabaseHas('question_banks', $data);

        $updatedData = [
            'name' => 'Updated Question Bank',
        ];

        $updated = $this->service->update(QuestionBank::first()->id, $updatedData);

        $this->assertInstanceOf(QuestionBank::class, $updated);
        $this->assertEquals($updatedData['name'], $updated->name);
    }


    public function testGetAllPaginated()
    {
        $this->actingAs($this->user);

        $search = [
        ];

        $pageSize = 15;

        $response = $this->service->getAllPaginated($search, $pageSize);

        $this->assertInstanceOf(LengthAwarePaginator::class, $response);
    }

    public function testGetAll()
    {
        $this->actingAs($this->user);

        $search = [
            // Add your search criteria here
        ];

        $response = $this->service->getAll($search);

        $this->assertInstanceOf(Collection::class, $response);
    }

    public function testCount()
    {
        $search = [
            // Add your search criteria here
        ];

        $count = $this->service->count($search);

        $this->assertIsInt($count);
    }

    public function testFindOrFail()
    {
        $key = 1;
        $column = 'id';

        $model = $this->service->findOrFail($key, $column);

        $this->assertInstanceOf(Model::class, $model);
    }

    public function testFind()
    {
        $attributes = [
            // Add your attributes here
        ];

        $response = $this->service->find($attributes);

        $this->assertInstanceOf(Collection::class, $response);
    }

    public function testInsert()
    {
        $data = [
            "name" => $this->faker->name
        ];

        $saved = $this->service->insert($data);

        $this->assertTrue($saved);
    }

    public function testDelete()
    {
        $qb = $this->service->create([
            "name" => $this->faker->name
        ]);

        $deleted = $this->service->delete($qb);

        $this->assertTrue($deleted);
    }

}

