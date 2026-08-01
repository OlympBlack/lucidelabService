<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::query();
        if (!$request->is('*/admin/*')) {
            $query->where('is_active', true);
        }
        
        return response()->json([
            'success' => true,
            'data' => $query->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:services,code',
            'title' => 'required|string',
            'subtitle' => 'nullable|string',
            'description' => 'required|string',
            'details' => 'nullable|array',
            'is_active' => 'nullable|boolean',
        ]);

        $service = Service::create($validated);
        return response()->json(['success' => true, 'data' => $service], 201);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'code' => 'sometimes|required|string|unique:services,code,' . $service->id,
            'title' => 'sometimes|required|string',
            'subtitle' => 'nullable|string',
            'description' => 'sometimes|required|string',
            'details' => 'nullable|array',
            'is_active' => 'nullable|boolean',
        ]);

        $service->update($validated);
        return response()->json(['success' => true, 'data' => $service]);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['success' => true, 'message' => 'Service supprimé']);
    }
}
