<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $query = Announcement::query();
        if (!$request->is('*/admin/*')) {
            $query->where('is_active', true);
        }
        
        return response()->json([
            'success' => true,
            'data' => $query->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'link_url' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $announcement = Announcement::create($validated);
        return response()->json(['success' => true, 'data' => $announcement], 201);
    }

    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
            'link_url' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $announcement->update($validated);
        return response()->json(['success' => true, 'data' => $announcement]);
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();
        return response()->json(['success' => true, 'message' => 'Annonce supprimée']);
    }
}
