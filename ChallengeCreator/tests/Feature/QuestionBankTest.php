<?php

// use App\Http\Controllers\QuestionBankController;
// use App\Models\User;
// use Inertia\Testing\AssertableInertia;
// use function Pest\Laravel\get;
// use function Pest\Laravel\actingAs;

// beforeEach(function () {
//     $this->user = User::factory()->createOne();
//     actingAs($this->user);
// });

// test('can show list of contacts', function () {
//     $contacts = UserContact::factory()
//         ->for($this->user)
//         ->count(10)
//         ->create();

//     $response = get(action([UserContactController::class, 'index']));

//     $response->assertInertia(function (AssertableInertia $page) {
//         $page
//             ->component('Contacts/ContactsPage')
//             ->has('viewData.paginatedUserContacts', function (AssertableInertia $page) {
//             });
//     });
// })
