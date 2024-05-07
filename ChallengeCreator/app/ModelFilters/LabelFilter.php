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
        return $this->where("question_bank_id", '=', $id)->whereNull("label_id")->with("sublabels");
    }

    public function sublabel($data) {
        $label_name = $data[0];
        $sublabel_name = $data[1];
        $qbid = $data[2];
        return $this->where("name", '=', $sublabel_name)->where("question_bank_id", '=', $qbid)
        ->whereHas("parent", function($query) use ($label_name){
            $query->where("name", '=', $label_name);
        });
    }

    public function all($qbid) {
        return $this->where("question_bank_id", '=', $qbid)->whereNull("label_id")
        ->withCount("questions")
        ->with(['sublabels' => function($query){
            $query->withCount('questions');
        }])
        ->get();
    }

}
