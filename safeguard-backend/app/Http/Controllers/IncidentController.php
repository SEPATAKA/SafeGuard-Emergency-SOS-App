<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Incident;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\SosAlertMail;

class IncidentController extends Controller
{
    public function triggerSos(Request $request)
    {
        $user = $request->user();

        // Mobile App එකෙන් එවන Location දත්ත
        $lat = $request->input('lat');
        $lng = $request->input('lng');
        $address = $request->input('location_address', 'Unknown Location');

        // Database එකට Incident එක ලියන්න
        $incident = Incident::create([
            'user_id' => $user->id,
            'type' => 'sos',
            'location_address' => $address,
            'lat' => $lat,
            'lng' => $lng,
            'status' => 'active',
            'contacts_notified' => 0
        ]);

        // මේ User ගෙ Emergency Contacts ලව ගන්න
        $contacts = Contact::where('user_id', $user->id)
                           ->where('notify_email', true)
                           ->get();

        $notifiedCount = 0;

        // හැම Contact කෙනෙක්ටම Email එක යවන්න
        foreach ($contacts as $contact) {
            try {
                Mail::to($contact->email)->send(new SosAlertMail($user, $incident, $contact));
                $notifiedCount++;
            } catch (\Exception $e) {
                // Email එක යවන්න බැරි වුණොත් මේක skip කරලා අනිත් අයට යවනවා
            }
        }

        // Email යවපු ගාණ Update කරන්න
        $incident->update(['contacts_notified' => $notifiedCount]);

        return response()->json([
            'message' => 'SOS Alert Triggered Successfully',
            'incident_id' => $incident->id,
            'emails_sent' => $notifiedCount
        ], 200);
    }
}