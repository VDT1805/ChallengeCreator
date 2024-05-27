<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class TestFilter extends ModelFilter
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
    public function keyword($keyword)
    {
        return $this->where('name','LIKE', '%'.$keyword.'%');
    }
    public function alphab($order) {
        if ($order == 'asc') {
            return $this->orderBy('name', 'asc');
        }
        else {
            return $this->orderBy('name', 'desc');
        }
    }
    public function id(string $id)
    {
        return $this->where([['id','=', $id]]);
    }
}
