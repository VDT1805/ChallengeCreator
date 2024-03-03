<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Label extends Model
{
    use HasFactory,Filterable;

    public function questions() {
        return $this->hasMany(Question::class);
    }

    public function sublabels() {
        return $this->hasMany(Label::class, "label_id");
    }

    public function parent() {
        return $this->belongsTo(Label::class, "label_id");
    }
}
