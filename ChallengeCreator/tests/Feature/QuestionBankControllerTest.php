<?php

namespace Tests\Feature;

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
use Inertia\Testing\AssertableInertia;

class QuestionBankControllerTest extends TestCase
{
    use RefreshDatabase;

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

    public function test_index_showing_list(): void
    {
        $response = $this->get('/qbs');
        $response->assertStatus(200);
        $response->assertInertia(
            fn (AssertableInertia $page) =>
            $page->component('Dashboard') -> has('QBS')
        );
    }

    public function test_create_question_bank(): void
    {
        $response = $this->get('/qbs/create');
        $response->assertStatus(200);
    }

    public function test_store_question_bank(): void
    {
        $data = [
            "name" => "Test Question Bank",
        ];

        $response = $this->post('/qbs/create', $data);
        $response->assertStatus(200);
        $response->assertInertia(
            fn (AssertableInertia $page) =>
            $page->component('QuestionBank/QuestionBankPage') ->
            where('QBank.name', "Test Question Bank")
        );
    }

    public function test_show_question_bank_unauthorized(): void
    {
        $questionBankId = 1; // Provide the ID of the question bank to be shown

        $response = $this->get('/qbs/' . $questionBankId);
        $response->assertStatus(403);
    }

    public function test_show_question_bank(): void
    {
        $data = [
            "name" => "Test Question Bank",
        ];

        $response = $this->post('/qbs/create', $data);
        $response->assertStatus(200);
        $questionBankId = 1; // Provide the ID of the question bank to be shown

        $response = $this->get('/qbs/' . $questionBankId);
        $response->assertStatus(200);
    }

    public function test_edit_question_bank(): void
    {
        $data = [
            "name" => "Test Question Bank",
        ];

        $response = $this->post('/qbs/create', $data);
        $response->assertStatus(200);
        $questionBankId = 1; // Provide the ID of the question bank to be shown
        $response = $this->get('/qbs/' . $questionBankId . '/settings');
        $response->assertStatus(200);

        // Add additional assertions to verify the displayed question bank for editing
    }

    public function test_update_question_bank(): void
    {
        $data = [
            "name" => "Test Question Bank",
        ];

        $response = $this->post('/qbs/create', $data);
        $response->assertStatus(200);
        $questionBankId = 1; // Provide the ID of the question bank to be shown

        $response = $this->put('/qbs/' . $questionBankId . '/settings',['name' => 'Updated test Question Bank']);
        $response->assertStatus(200);

        // Add additional assertions to verify the updated question bank
    }

    public function test_destroy_question_bank(): void
    {
        $data = [
            "name" => "New test Question Bank",
        ];

        $response = $this->post('/qbs/create', $data);
        $response->assertStatus(200);
        $questionBankId = 1; // Provide the ID of the question bank to be shown
        $this->withoutExceptionHandling();
        $response = $this->delete('/qbs/' . $questionBankId. '/delete');
        $response->assertRedirect('/qbs');

        // Add additional assertions to verify the deletion of the question bank
    }
}
