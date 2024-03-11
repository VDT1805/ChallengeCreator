<?php

namespace App\ModelFilters;
use EloquentFilter\ModelFilter;

class LabelFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relationMethod => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];
    public function parent($id) {
        return $this->where("label_id", '=', $id);
    }
    public function id($id) {
        return $this->where("id", '=', $id);
    }
    public function questionbanks($id) {
        return $this->where("question_bank_id", '=', $id)->whereNull("label_id");
    }

    public function all($qbid) {
        return $this->select('l1.name as label', 'l2.name as sublabel')
        ->join('labels as l2', 'l1.id', '=', 'l2.label_id')
        ->where('l1.question_bank_id', $qbid)
        ->get();
    }
}
