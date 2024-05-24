<?php

namespace Tests\Unit;
use App\Http\Services\TestService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->service = new TestService();
        $this->actingAs($this->user);
        $this->seed();
    }
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }

    public function testGetAllPaginated(): void
    {
        $testService = new TestService();
        $result = $testService->getAllPaginated();
        
        $this->assertInstanceOf(LengthAwarePaginator::class, $result);
    }
    
    public function testGetAll(): void
    {
        $testService = new TestService();
        $result = $testService->getAll();
        
        $this->assertInstanceOf(Collection::class, $result);
    }
    
    public function testCount(): void
    {
        $testService = new TestService();
        $result = $testService->count();
        
        $this->assertIsInt($result);
    }
    
    public function testFindOrFail(): void
    {
        $testService = new TestService();
        $result = $testService->findOrFail(1);
        
        $this->assertInstanceOf(Model::class, $result);
    }
    
    public function testFind(): void
    {
        $testService = new TestService();
        $result = $testService->find(['name' => 'Test']);
        
        $this->assertInstanceOf(Collection::class, $result);
    }
    
    public function testCreate(): void
    {
        $testService = new TestService();
        $result = $testService->create(['name' => 'Test']);
        
        $this->assertInstanceOf(Model::class, $result);
    }
    
    public function testInsert(): void
    {
        $testService = new TestService();
        $result = $testService->insert(['name' => 'Test', 'question_bank_id' => 1]);
        
        $this->assertTrue($result);
    }
    
    public function testCreateMany(): void
    {
        $testService = new TestService();
        $result = $testService->createMany([['name' => 'Test1'], ['name' => 'Test2']]);
        
        $this->assertInstanceOf(Collection::class, $result);
    }
    
    public function testUpdateOrCreate(): void
    {
        $testService = new TestService();
        $result = $testService->updateOrCreate(['name' => 'Test'], ['name' => 'Updated Test']);
        
        $this->assertInstanceOf(Model::class, $result);
    }
    
    public function testUpdate(): void
    {
        $testService = new TestService();
        $result = $testService->update(1, ['name' => 'Updated Test']);
        
        $this->assertInstanceOf(Model::class, $result);
    }
    
    public function testDelete(): void
    {
        $testService = new TestService();
        $result = $testService->delete(1);
        
        $this->assertTrue($result);
    }
    
}
