"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@hexaflow.dev"

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function sendContactEmail({ name, email, message }: ContactFormData) {
  if (!name || !email || !message) {
    throw new Error("Missing required fields")
  }

  try {
    await resend.emails.send({
      from: "contact-form@hexaflow.dev",
      to: CONTACT_EMAIL,
      subject: `New contact from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to send email:", error)
    throw new Error("Failed to send email")
  }
}
