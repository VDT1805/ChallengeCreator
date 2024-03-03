<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laratrust\Models\Team as LaratrustTeam;

class QuestionBank extends LaratrustTeam
{
    use HasFactory, Filterable;
    public $guarded = [];


    public function users() {
        return $this->belongsToMany(
            User::class, 'role_user', 'team_id', 'user_id'
        );
    }

    public function roles() {
        return $this->belongsToMany(
            Role::class, 'role_user'
        );
    }

    public function tests() {
        return $this->hasMany(
            Test::class
        );
    }

    public function labels() {
        return $this->hasMany(
            Label::class
        );
    }

    public function questions() {
        return $this->hasMany(
            Question::class, "question_bank_id"
        );
    }
}
