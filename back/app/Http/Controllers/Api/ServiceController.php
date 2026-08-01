<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Service::where('is_active', true)->get()
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
        ]);

        $service = Service::create($validated);
        return response()->json(['success' => true, 'data' => $service], 201);
    }

    public function update(Request $request, Service $service)
    {
        $service->update($request->all());
        return response()->json(['success' => true, 'data' => $service]);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['success' => true, 'message' => 'Service supprimé']);
    }
}
