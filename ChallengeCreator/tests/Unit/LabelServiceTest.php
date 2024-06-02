<?php

namespace Tests\Unit;

use App\Http\Services\LabelService;
use App\Http\Services\TestService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Http\Services\QuestionBankService;
use App\Models\QuestionBank;
use App\Models\User;
use App\Models\Label;
use Tests\TestCase;

class LabelServiceTest extends TestCase
{
    use withFaker,RefreshDatabase;
    /**
     * A basic unit test example.
     */
    private LabelService $service;
    private User $user;
    private QuestionBank $qb;
    private QuestionBankService $qbservice;
    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->service = new LabelService();
        $this->qbservice = new QuestionBankService();
        $this->actingAs($this->user);
        $this->seed();
        $this->qb = $this->qbservice->create([
            "name" => $this->faker->name
        ]);
    }

    public function testGetAllPaginated(): void
    {
        $labels = [];
                for ($i = 1; $i <= 20; $i++) {
                    $labels[] = ['name' => 'Label ' . $i,"description" => "", 'question_bank_id' => $this->qb->id];
                }
                
        $result = $this->service->createMany($labels);
        $result = $this->service->getAllPaginated();
        
        $this->assertInstanceOf(LengthAwarePaginator::class, $result);
        $this->assertEquals(15, $result->perPage());
    }
    
    public function testGetAll(): void
    {
        $labels = [];
                for ($i = 1; $i <= 3; $i++) {
                    $labels[] = ['name' => 'Label ' . $i,"description" => "", 'question_bank_id' => $this->qb->id];
                }
                
        $result = $this->service->createMany($labels);
        $result = $this->service->getAll();
        
        $this->assertInstanceOf(Collection::class, $result);
        $this->assertEquals(5, $result->count());
    }
    
    public function testCount(): void
    {
        $labels = [];
            for ($i = 1; $i <= 3; $i++) {
                    $labels[] = ['name' => 'Label ' . $i,"description" => "", 'question_bank_id' => $this->qb->id];
                }
        
        $result = $this->service->createMany($labels);
        $result = $this->service->count();
        
        $this->assertIsInt($result);
        $this->assertEquals(5, $result);
    }
    
    public function testFindOrFail(): void
    {
        $labels = [];
            for ($i = 1; $i <= 3; $i++) {
                    $labels[] = ['name' => 'Label ' . $i,"description" => "", 'question_bank_id' => $this->qb->id];
                }
        
        $result = $this->service->createMany($labels);
        $result = $this->service->findOrFail("id",1);
        
        $this->assertInstanceOf(Model::class, $result);
        $this->assertEquals(1, $result->id);
    }
    
    public function testFind(): void
    {
        $labels = [];
            for ($i = 1; $i <= 3; $i++) {
                    $labels[] = ['name' => 'Label ' . $i,"description" => "", 'question_bank_id' => $this->qb->id];
                }
        $result = $this->service->find(['name' => 'Label 1']);
        
        $this->assertInstanceOf(Collection::class, $result);
        $this->assertEquals(2, $result->count());
    }
    
    public function testCreate(): void
    {
        
        $result = $this->service->create(['name' => 'Label 1',"description" => "", 'question_bank_id' => $this->qb->id]);
        
        $this->assertInstanceOf(Model::class, $result);
        $this->assertDatabaseHas('labels', ['name' => 'Label 1', 'question_bank_id' => $this->qb->id]);
    }
    
    public function testInsert(): void
    {
        
        $result = $this->service->insert(['name' => 'Label 1',"description" => "", 'question_bank_id' => $this->qb->id]);
        
        $this->assertTrue($result);
        $this->assertDatabaseHas('labels', ['name' => 'Label 1', 'question_bank_id' => $this->qb->id]);
    }
    
    
    
    public function testUpdate(): void
    {
        $result = $this->service->create(['name' => 'Label 1',"description" => "", 'question_bank_id' => $this->qb->id]);
        $result = $this->service->update(1, ['name' => 'Updated Label',"description" => "", 'question_bank_id' => $this->qb->id]);
        
        $this->assertInstanceOf(Model::class, $result);
        $this->assertDatabaseHas('labels', ['name' => 'Updated Label',"question_bank_id" => $this->qb->id]);
    }
    
    public function testDelete(): void
    {
        $result = $this->service->create(['name' => 'Label 1',"description" => "", 'question_bank_id' => $this->qb->id]);
        $result = $this->service->delete($result->id);
        
        $this->assertTrue($result);
        $this->assertDatabaseMissing('labels', ['name' => 'Label 1',"question_bank_id" => $this->qb->id]);
    }
}
