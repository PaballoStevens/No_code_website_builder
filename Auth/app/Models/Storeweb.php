<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Storeweb extends Model
{
    use HasFactory;

    protected $fillable = [
        'userid',
        'projectName',
        'html',
        'css',
        'identifier'
    ];
}
