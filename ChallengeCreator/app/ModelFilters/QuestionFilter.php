<?php

namespace App\ModelFilters;
use EloquentFilter\ModelFilter;
use Illuminate\Database\Eloquent\Builder;
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
    public function id($id) {
        return $this->where("id", '=', $id);
    }
}
