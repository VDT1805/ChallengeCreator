<?php

namespace App\ModelFilters;
use EloquentFilter\ModelFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

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
        return $this->where('questions.question_bank_id','=', $id);
    }

    public function tests($ids)
    {
        return $this->select('questions.*')
        ->leftJoin('question_test as qt', function ($join) use ($ids) {
            $join->on('questions.id', '=', 'qt.question_id')
                ->where('qt.test_id', '=', $ids["test"]);
        })
        ->where('questions.question_bank_id', '=', $ids["qb"])
        ->selectRaw('IF(qt.test_id IS NOT NULL, 1, 0) AS inTest')->orderBy("inTest","desc")
        ->get();
    }

    public function questiontest ($testid) {
        return $this->select('questions.*')
        ->join('question_test', function ($join) use ($testid) {
            $join->on('questions.id', '=', 'question_test.question_id')
                ->where('question_test.test_id', '=', $testid);
        })
        ->get();
    }
    public function id($id) {
        return $this->where("id", '=', $id);
    }

    public function labels($parent_id) {
        return $this->select('questions.*')
        ->join("labels as sublabels", function($join) use ($parent_id){
            $join->on("questions.label_id", "=", "sublabels.id")->where("sublabels.label_id","=",$parent_id);
        })
        ->get();
    }

    public function sublabels($id) {
        return $this->where("label_id", '=', $id);
    }

    public function keyword($keyword) {
        return $this->where("question", 'LIKE', '%'.$keyword.'%');
    }
}
