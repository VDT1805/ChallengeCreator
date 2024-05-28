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
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
