<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    // දැනට ලොග් වෙලා ඉන්න User ගෙ Contacts ටික බලාගැනීම
    public function index(Request $request)
    {
        $contacts = Contact::where('user_id', $request->user()->id)
                           ->orderBy('priority', 'asc')
                           ->get();
                           
        return response()->json($contacts, 200);
    }

    // අලුතින් Emergency Contact කෙනෙක් එකතු කිරීම
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'relation' => 'nullable|string|max:50',
        ]);

        // දැනට ඉන්න Contacts ගාණ අරගෙන අලුත් කෙනාගෙ Priority එක හදන්න
        $currentCount = Contact::where('user_id', $request->user()->id)->count();

        $contact = Contact::create([
            'user_id' => $request->user()->id,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'relation' => $request->relation ?? 'Family',
            'notify_email' => true,
            'priority' => $currentCount + 1,
        ]);

        return response()->json([
            'message' => 'Contact added successfully',
            'contact' => $contact
        ], 201);
    }
}