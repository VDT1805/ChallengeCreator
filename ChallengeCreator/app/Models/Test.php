<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory,Filterable;
    // public function questionbank() {
    //     return $this->belongsTo(
    //         QuestionBank::class
    //     );
    // }
}
