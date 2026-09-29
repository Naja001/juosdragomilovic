import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Sva polja su obavezna." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "OŠ Drago Milović <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Kontakt forma: ${subject}`,
      text: `
Ime i prezime: ${name}
Email: ${email}

Poruka:
${message}
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Poruka je uspješno poslata.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        error: "Došlo je do greške prilikom slanja poruke.",
      },
      { status: 500 }
    );
  }
}