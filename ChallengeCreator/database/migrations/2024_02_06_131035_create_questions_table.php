<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('question');
            $table->string('ans1')->nullable();
            $table->string('ans2')->nullable();
            $table->string('ans3')->nullable();
            $table->string('ans4')->nullable();
            $table->string('ans5')->nullable();
            $table->string('ans6')->nullable();
            $table->string('correct');
            $table->foreignId('question_bank_id')->constrained('question_banks')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
