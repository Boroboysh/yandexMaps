<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Pointers extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'longitude',
        'latitude',
        'username_id'
    ];
}
