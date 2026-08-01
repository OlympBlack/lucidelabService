<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    /**
     * Upload an image to public storage and return the accessible URL.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
        ]);

        try {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = Str::uuid() . '.' . $extension;

            // Store in storage/app/public/uploads/
            $path = $file->storeAs('uploads', $filename, 'public');

            // Return the publicly accessible URL
            $url = url('storage/' . $path);

            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => '/storage/' . $path,
                'filename' => $filename,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'upload : ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete an uploaded image from storage.
     */
    public function deleteImage(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        try {
            // Only allow deletion of files in uploads/ folder for security
            $relativePath = ltrim($request->path, '/storage/');
            if (!Str::startsWith($relativePath, 'uploads/')) {
                return response()->json(['success' => false, 'message' => 'Chemin non autorisé.'], 403);
            }

            $deleted = Storage::disk('public')->delete($relativePath);

            return response()->json([
                'success' => $deleted,
                'message' => $deleted ? 'Image supprimée.' : 'Image introuvable.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur : ' . $e->getMessage(),
            ], 500);
        }
    }
}
