<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::query();
        if (!$request->is('*/admin/*')) {
            $query->where('is_published', true);
        }

        return response()->json([
            'success' => true,
            'data' => $query->latest()->get()
        ]);
    }

    public function show($slug)
    {
        $blog = is_numeric($slug) 
            ? Blog::findOrFail($slug) 
            : Blog::where('slug', $slug)->firstOrFail();
        
        if (!is_numeric($slug)) {
            $blog->increment('views_count');
        }

        return response()->json(['success' => true, 'data' => $blog]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'author' => 'nullable|string',
            'image_url' => 'nullable|string',
            'is_published' => 'nullable|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        $blog = Blog::create($validated);
        return response()->json(['success' => true, 'data' => $blog], 201);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'category' => 'sometimes|required|string',
            'excerpt' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
            'author' => 'nullable|string',
            'image_url' => 'nullable|string',
            'is_published' => 'nullable|boolean',
        ]);

        if (isset($validated['title']) && $validated['title'] !== $blog->title) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        }

        $blog->update($validated);
        return response()->json(['success' => true, 'data' => $blog]);
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();
        return response()->json(['success' => true, 'message' => 'Article supprimé']);
    }
}
