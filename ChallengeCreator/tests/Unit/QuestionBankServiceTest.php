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

        $role = Role::create(['name' => 'owner']);

        $user = User::factory()->create();
        $this->actingAs($user);

        $model = $this->service->create($data);

        $this->assertInstanceOf(QuestionBank::class, $model);
        $this->assertDatabaseHas('question_banks', $data);
        $this->assertTrue($user->hasRole('owner', $model));
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

    public function test_example(): void
    {
        $this->assertTrue(true);
    }
}
