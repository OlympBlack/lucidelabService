<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Realisation;
use Illuminate\Http\Request;

class RealisationController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Realisation::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'client_name' => 'required|string',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'year' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
        ]);

        $realisation = Realisation::create($validated);
        return response()->json(['success' => true, 'data' => $realisation], 201);
    }

    public function show(Realisation $realisation)
    {
        return response()->json(['success' => true, 'data' => $realisation]);
    }

    public function update(Request $request, Realisation $realisation)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'category' => 'sometimes|required|string',
            'client_name' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'image_url' => 'nullable|string',
            'year' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
        ]);

        $realisation->update($validated);
        return response()->json(['success' => true, 'data' => $realisation]);
    }

    public function destroy(Realisation $realisation)
    {
        $realisation->delete();
        return response()->json(['success' => true, 'message' => 'Projet supprimé']);
    }
}
