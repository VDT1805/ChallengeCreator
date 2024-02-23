<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory,Filterable;
    public $guarded = [];
    // public function questionbank() {
    //     return $this->belongsTo(
    //         QuestionBank::class
    //     );
    // }
    public function questions() {
        return $this->belongsToMany(
            Question::class
        );
    }
}
