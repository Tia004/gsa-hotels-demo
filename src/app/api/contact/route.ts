import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, azienda, email, telefono, messaggio, interesse } = body;

    // In a production environment, you would use a service like Resend, SendGrid, or Nodemailer here.
    // For this demo, we'll simulate the successful process and provide the HTML template logic.
    
    // Target: stefanogolisano@gsa-hotels.com
    console.log('Sending email to stefanogolisano@gsa-hotels.com', body);

    /* 
    EMAIL TEMPLATE CONCEPT (HTML):
    --------------------------------------------------
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; border: 1px solid #C5A059;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://gsahotels.vercel.app/assets/logo.png" alt="GSA Hotels" style="width: 120px;" />
      </div>
      
      <h2 style="color: #C5A059; border-bottom: 1px solid #C5A059; padding-bottom: 10px; font-family: 'Bodoni', serif;">Nuova Richiesta di Contatto</h2>
      
      <p style="font-size: 16px; line-height: 1.6;">Hai ricevuto un nuovo lead dal sito GSA Hotels:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #333; color: #C5A059; font-weight: bold; width: 40%;">NOME:</td>
          <td style="padding: 10px; border-bottom: 1px solid #333;">${nome}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #333; color: #C5A059; font-weight: bold;">AZIENDA/HOTEL:</td>
          <td style="padding: 10px; border-bottom: 1px solid #333;">${azienda}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #333; color: #C5A059; font-weight: bold;">EMAIL:</td>
          <td style="padding: 10px; border-bottom: 1px solid #333;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #333; color: #C5A059; font-weight: bold;">TELEFONO:</td>
          <td style="padding: 10px; border-bottom: 1px solid #333;">${telefono}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #333; color: #C5A059; font-weight: bold;">INTERESSE:</td>
          <td style="padding: 10px; border-bottom: 1px solid #333;">${interesse}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-top: 1px solid #C5A059; background: #111; vertical-align: top; color: #C5A059; font-weight: bold;" colspan="2">MESSAGGIO:</td>
        </tr>
        <tr>
          <td style="padding: 20px; background: #111; line-height: 1.6;" colspan="2">${messaggio}</td>
        </tr>
      </table>
      
      <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
        &copy; 2024 GSA Hotels - Ingegneria dell'Ospitalità
      </div>
    </div>
    --------------------------------------------------
    */

    // Returning success for the frontend demo
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
