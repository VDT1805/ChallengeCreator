<?php

namespace Tests\Unit;

use App\Http\Services\MemberService;
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

class MemberServiceTest extends TestCase
{
    use withFaker,RefreshDatabase;
    /**
     * A basic unit test example.
     */
    private MemberService $service;
    private Collection $members;
    private User $user,$user2;
    private QuestionBank $qb;
    private QuestionBankService $qbservice;
    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
        $this->user2 = User::factory()->create();
        $this->service = new MemberService();
        $this->qbservice = new QuestionBankService();
        $this->seed();
        $this->qb = $this->qbservice->create([
            "name" => $this->faker->name
        ]);
    }

    public function testGetAllPaginated(): void
    {
        $result = $this->service->getAllPaginated(["questionbanks" => $this->qb->id]);
        
        $this->assertInstanceOf(LengthAwarePaginator::class, $result);
        $this->assertEquals(15, $result->perPage());
    }
    
    public function testGetAll(): void
    {
        $result = $this->service->getAll(["questionbanks" => $this->qb->id]);
        
        $this->assertInstanceOf(Collection::class, $result);
        $this->assertEquals(1, $result->count());
    }
    
    public function testCount(): void
    {
        $result = $this->service->count();
        
        $this->assertIsInt($result);
        $this->assertEquals(2, $result);
    }
    
    // public function testFindOrFail(): void
    // {
    //     $result = $this->service->findOrFail("id", 1);
        
    //     $this->assertInstanceOf(Model::class, $result);
    //     $this->assertEquals(1, $result->id);
    // }
    
    // public function testFind(): void
    // {
    //     $result = $this->service->find(['id' => '1']);
        
    //     $this->assertInstanceOf(Collection::class, $result);
    //     $this->assertEquals(2, $result->count());
    // }
    
    public function testCreate(): void
    {
        $this->actingAs($this->user2);
        $result = $this->service->create(['role' => 'editor', "qb"=>$this->qb]);
        
        $this->assertInstanceOf(Model::class, $result);
        $this->assertDatabaseHas('role_user', ['user_id'=>$this->user2->id,'role_id' => '2', 'team_id' => $this->qb->id]);
    }

    
    public function testDelete(): void
    {
        $newuser = User::factory()->create();
        $this->actingAs($newuser);
        $result = $this->service->create(['role' => 'editor', "qb"=>$this->qb]);
        $result = $this->service->delete($newuser->id,['role' => 'editor', "team"=>$this->qb] );
        
        $this->assertTrue($result);
        // $this->assertDatabaseMissing('labels', ['name' => 'Label 1',"question_bank_id" => $this->qb->id]);
    }
}
