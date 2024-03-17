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
        return $this->select('labels.name', 'child.name')
        ->join('labels as child', function ($join) use ($qbid) {
            $join->on('labels.id', '=', 'child.label_id');

        })
        ->where('labels.question_bank_id', $qbid)
        ->get();
    }
}
