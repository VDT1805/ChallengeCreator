<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class QuestionFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relationMethod => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];
    public function questionbanks($id)
    {
        return $this->where('question_bank_id','=', $id);
    }
}
