import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email no válido"),
  phone: z.string().optional(),
  message: z.string().min(1, "El mensaje es obligatorio"),
});

// Escapa caracteres HTML para prevenir inyección en el cuerpo del email
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos de formulario no válidos", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = result.data;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY no está configurada");
      return NextResponse.json(
        { error: "Error de configuración del servidor: Falta la clave API de Resend" },
        { status: 500 }
      );
    }

    // Import dinámico: solo se carga el SDK cuando el body ya es válido
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // Determine the sender and recipient addresses from env variables
    const sender = process.env.SENDER_EMAIL || "onboarding@resend.dev";
    const recipient = process.env.RECIPIENT_EMAIL || "info@ltevo.com";

    // Escape de todos los campos interpolados en el HTML del email
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedPhone = escapeHtml(phone || "No proporcionado");
    const escapedMessage = escapeHtml(message);

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
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111;">${escapedName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee; color: #333;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111;"><a href="mailto:${escapedEmail}" style="color: #0066cc; text-decoration: none;">${escapedEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee; color: #333;">Teléfono:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111;">${escapedPhone}</td>
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
  } catch (error: unknown) {
    console.error("Error procesando el formulario de contacto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
