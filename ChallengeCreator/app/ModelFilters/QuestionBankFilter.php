<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class QuestionBankFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relationMethod => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];
    public function users($id)
    {
        return $this->related('users','user_id','=', $id);
    }
    public function id($id)
    {
        return $this->where('id','=', $id);
    }
}
