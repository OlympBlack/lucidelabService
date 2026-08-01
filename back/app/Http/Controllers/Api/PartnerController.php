<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function index(Request $request)
    {
        $query = Partner::query();
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
            'name' => 'required|string',
            'role' => 'nullable|string',
            'testimonial' => 'nullable|string',
            'logo_url' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'is_active' => 'nullable|boolean',
        ]);

        $partner = Partner::create($validated);
        return response()->json(['success' => true, 'data' => $partner], 201);
    }

    public function update(Request $request, Partner $partner)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'role' => 'nullable|string',
            'testimonial' => 'nullable|string',
            'logo_url' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'is_active' => 'nullable|boolean',
        ]);

        $partner->update($validated);
        return response()->json(['success' => true, 'data' => $partner]);
    }

    public function destroy(Partner $partner)
    {
        $partner->delete();
        return response()->json(['success' => true, 'message' => 'Partenaire supprimé']);
    }
}
