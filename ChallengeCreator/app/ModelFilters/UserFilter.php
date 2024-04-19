<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class UserFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relationMethod => [input_key1, input_key2]].
    *
    * @var array
    */
    // public $relations = ["questionbanks"=>"users"];
    public function id($id)
    {
        return $this->where("id", $id);
    }
    public function questionbanks($id)
    {
        return $this->join("role_user", function($join) use ($id){
            $join->on("users.id", "=", "role_user.user_id")
            ->where("role_user.team_id", "=", $id);
        })
        ->join("roles", function($join){
            $join->on("role_user.role_id", "=", "roles.id");
        })
        ->select("users.*", "roles.name as role_name")
        ->get();;
    }
}
