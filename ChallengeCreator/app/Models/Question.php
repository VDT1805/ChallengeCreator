<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory, Filterable;
    public $guarded = [];

    public function tests() {
        return $this->belongsToMany(
            User::class, 'question_test', 'question_id', 'test_id'
        );
    }

    public function labels() {
        return $this->belongsTo(
            Label::class
        );
    }
}
