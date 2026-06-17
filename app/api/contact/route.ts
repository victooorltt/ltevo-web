import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email no válido"),
  phone: z.string().optional(),
  message: z.string().min(1, "El mensaje es obligatorio"),
});

// Avoid initializing Resend if key is missing during build time
const getResendInstance = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos de formulario no válidos", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = result.data;

    const resend = getResendInstance();
    if (!resend) {
      console.error("RESEND_API_KEY no está configurada");
      return NextResponse.json(
        { error: "Error de configuración del servidor: Falta la clave API de Resend" },
        { status: 500 }
      );
    }

    // Determine the sender and recipient addresses from env variables
    const sender = process.env.SENDER_EMAIL || "onboarding@resend.dev";
    const recipient = process.env.RECIPIENT_EMAIL || "info@ltevo.com";

    // Escape message HTML characters to prevent simple injection issues in the email body
    const escapedMessage = message
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    const { data, error } = await resend.emails.send({
      from: `LTevo Web <${sender}>`,
      to: [recipient],
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #111; border-bottom: 2px solid #111; padding-bottom: 10px; margin-top: 0;">Nuevo mensaje de contacto</h2>
          <p style="color: #555; font-size: 15px; line-height: 1.5;">Has recibido un nuevo mensaje a través del formulario de contacto del sitio web.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tbody>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee; width: 120px; color: #333;">Nombre:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee; color: #333;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee; color: #333;">Teléfono:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111;">${phone || "No proporcionado"}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="margin-top: 25px;">
            <p style="font-weight: bold; margin-bottom: 8px; color: #333;">Mensaje:</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #111; white-space: pre-wrap; font-style: italic; color: #333; line-height: 1.6; border-radius: 0 4px 4px 0;">
              ${escapedMessage}
            </div>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
          <p style="font-size: 12px; color: #888; text-align: center; margin-bottom: 0;">Este correo fue enviado automáticamente desde el sitio web de LTevo.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error procesando el formulario de contacto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
