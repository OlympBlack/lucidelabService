<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use Illuminate\Http\Request;

class SocialLinkController extends Controller
{
    public function index()
    {
        $links = SocialLink::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $links
        ]);
    }

    public function adminIndex()
    {
        $links = SocialLink::orderBy('sort_order', 'asc')->get();
        return response()->json([
            'success' => true,
            'data' => $links
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'platform' => 'required|string|max:100',
            'url' => 'required|string|max:500',
            'icon' => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $link = SocialLink::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Réseau social ajouté avec succès',
            'data' => $link
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $link = SocialLink::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'platform' => 'sometimes|required|string|max:100',
            'url' => 'sometimes|required|string|max:500',
            'icon' => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $link->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Réseau social mis à jour',
            'data' => $link
        ]);
    }

    public function destroy($id)
    {
        $link = SocialLink::findOrFail($id);
        $link->delete();

        return response()->json([
            'success' => true,
            'message' => 'Réseau social supprimé'
        ]);
    }
}
