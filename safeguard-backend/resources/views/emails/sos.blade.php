<div style="font-family: sans-serif; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px;">
    <h2 style="color: #ef4444; text-align: center;">🚨 EMERGENCY SOS ALERT</h2>
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    
    <p>Dear <strong>{{ $contact->name }}</strong>,</p>
    <p><strong style="color: #dc2626; font-size: 18px;">{{ $user->name }}</strong> has triggered an SOS alert and may need immediate assistance.</p>
    
    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0;"><strong>📍 LIVE LOCATION:</strong></p>
        @if($incident->lat && $incident->lng)
            <a href="https://maps.google.com/?q={{ $incident->lat }},{{ $incident->lng }}" style="color: #2563eb; font-weight: bold;">View on Google Maps</a>
        @else
            <p style="margin: 0; color: #666;">Address: {{ $incident->location_address }}</p>
        @endif
    </div>

    <p style="color: #666; font-size: 14px;">🕐 Triggered at: {{ $incident->created_at }}</p>
    
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">This alert was sent automatically via SafeGuard Emergency SOS System.<br>Powered by Laravel + PHP Mail</p>
</div>