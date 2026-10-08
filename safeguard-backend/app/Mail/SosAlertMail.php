<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SosAlertMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $incident;
    public $contact;

    public function __construct($user, $incident, $contact)
    {
        $this->user = $user;
        $this->incident = $incident;
        $this->contact = $contact;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🚨 SOS ALERT — ' . $this->user->name . ' needs help!',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.sos',
        );
    }
}