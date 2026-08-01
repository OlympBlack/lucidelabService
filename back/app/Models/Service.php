<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'title', 'subtitle', 'description', 'details', 'is_active'];

    protected $casts = [
        'details' => 'array',
        'is_active' => 'boolean',
    ];
}
