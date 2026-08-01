<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => ContactMessage::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'service' => 'required|string',
            'subject' => 'nullable|string',
            'message' => 'required|string',
        ]);

        $message = ContactMessage::create($validated);
        return response()->json(['success' => true, 'message' => 'Message envoyé avec succès', 'data' => $message], 201);
    }

    public function destroy($id)
    {
        $contactMessage = ContactMessage::findOrFail($id);
        $contactMessage->delete();
        return response()->json(['success' => true, 'message' => 'Message supprimé']);
    }

    public function markAsRead($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->status = 'READ';
        $message->save();
        return response()->json(['success' => true]);
    }

    public function markAllAsRead()
    {
        ContactMessage::where('status', 'NEW')->update(['status' => 'READ']);
        return response()->json(['success' => true]);
    }
}
