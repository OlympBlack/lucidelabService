<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Realisation extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'category', 'client_name', 'description', 'image_url', 'year', 'is_featured'];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}
