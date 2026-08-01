<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'category', 'excerpt', 'content', 'author', 'image_url', 'views_count', 'is_published'];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}
