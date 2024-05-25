<?php

namespace Tests\Unit;
use App\Http\Services\TestService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Http\Services\QuestionBankService;
use App\Models\QuestionBank;
use App\Models\User;
use Tests\TestCase;

class TestServiceTest extends TestCase
{

    use withFaker,RefreshDatabase;
    /**
     * A basic unit test example.
     */
    private TestService $service;
    private User $user;
    private QuestionBank $qb;
    private QuestionBankService $qbservice;
    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->service = new TestService();
        $this->qbservice = new QuestionBankService();
        $this->actingAs($this->user);
        $this->seed();
        $this->qb = $this->qbservice->create([
            "name" => $this->faker->name
        ]);
    }

    public function testGetAllPaginated(): void
    {
        $tests = [];
                for ($i = 1; $i <= 20; $i++) {
                    $tests[] = ['name' => 'Test ' . $i, 'question_bank_id' => $this->qb->id];
                }
                
        $result = $this->service->createMany($tests);
        $result = $this->service->getAllPaginated();
        
        $this->assertInstanceOf(LengthAwarePaginator::class, $result);
        $this->assertEquals(15, $result->perPage());
    }
    
    public function testGetAll(): void
    {
        $tests = [];
        for ($i = 1; $i <= 3; $i++) {
            $tests[] = ['name' => 'Test ' . $i, 'question_bank_id' => $this->qb->id];
        }
        
        $result = $this->service->createMany($tests);
        $result = $this->service->getAll();
        
        $this->assertInstanceOf(Collection::class, $result);
        $this->assertEquals(3, $result->count());
    }
    
    public function testCount(): void
    {
        $tests = [];
        for ($i = 1; $i <= 3; $i++) {
            $tests[] = ['name' => 'Test ' . $i, 'question_bank_id' => $this->qb->id];
        }
        
        $result = $this->service->createMany($tests);
        $result = $this->service->count();
        
        $this->assertIsInt($result);
    }
    
    public function testFindOrFail(): void
    {
        $tests = [];
        for ($i = 1; $i <= 3; $i++) {
            $tests[] = ['name' => 'Test ' . $i, 'question_bank_id' => $this->qb->id];
        }
        
        $result = $this->service->createMany($tests);
        $result = $this->service->findOrFail("id",1);
        
        $this->assertInstanceOf(Model::class, $result);
        $this->assertEquals(1, $result->id);
    }
    
    public function testFind(): void
    {
        $tests = [];
        for ($i = 1; $i <= 3; $i++) {
            $tests[] = ['name' => 'Test ' . $i, 'question_bank_id' => $this->qb->id];
        }
        $result = $this->service->find(['name' => 'Test1']);
        
        $this->assertInstanceOf(Collection::class, $result);
    }
    
    public function testCreate(): void
    {
        
        $result = $this->service->create(['name' => 'Test',"question_bank_id" => $this->qb->id]);
        
        $this->assertInstanceOf(Model::class, $result);
        $this->assertDatabaseHas('tests', ['name' => 'Test', 'question_bank_id' => $this->qb->id]);
    }
    
    public function testInsert(): void
    {
        
        $result = $this->service->insert(['name' => 'Test', 'question_bank_id' => $this->qb->id]);
        
        $this->assertTrue($result);
        $this->assertDatabaseHas('tests', ['name' => 'Test', 'question_bank_id' => $this->qb->id]);
    }
    
    
    
    public function testUpdate(): void
    {
        $result = $this->service->create(['name' => 'Test',"question_bank_id" => $this->qb->id]);
        $result = $this->service->update(1, ['name' => 'Updated Test']);
        
        $this->assertInstanceOf(Model::class, $result);
        $this->assertDatabaseHas('tests', ['name' => 'Updated Test',"question_bank_id" => $this->qb->id]);
    }
    
    public function testDelete(): void
    {
        $result = $this->service->create(['name' => 'Test',"question_bank_id" => $this->qb->id]);
        $result = $this->service->delete(1);
        
        $this->assertTrue($result);
        $this->assertDatabaseMissing('tests', ['name' => 'Test',"question_bank_id" => $this->qb->id]);
    }
    
}
