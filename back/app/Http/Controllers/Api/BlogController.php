<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Blog::where('is_published', true)->latest()->get()
        ]);
    }

    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        $blog->increment('views_count');
        return response()->json(['success' => true, 'data' => $blog]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'excerpt' => 'required|string',
            'content' => 'required|string',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        $blog = Blog::create($validated);
        return response()->json(['success' => true, 'data' => $blog], 201);
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();
        return response()->json(['success' => true, 'message' => 'Article supprimé']);
    }
}
