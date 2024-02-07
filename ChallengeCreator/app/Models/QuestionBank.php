<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laratrust\Models\Team as LaratrustTeam;

class QuestionBank extends LaratrustTeam
{
    use HasFactory, Filterable;
    public $guarded = [];
}
