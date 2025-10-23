import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  } : undefined,
});

export interface QuizResultsEmailData {
  email: string;
  submissionId: string | number;
  riskLevel: string;
  urgency: string;
  primaryCauseType: string;
  primaryCauseConfidence: number;
  primaryCauseDescription: string;
  specialNote: string;
}

export class SESEmailService {
  private fromEmail: string;
  private fromName: string;
  private frontendUrl: string;

  constructor() {
    this.fromEmail = process.env.AWS_SES_FROM_EMAIL || '';
    this.fromName = process.env.AWS_SES_FROM_NAME || 'Fulani Hair Gro';
    this.frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    if (!this.fromEmail) {
      throw new Error('AWS_SES_FROM_EMAIL not configured');
    }
  }

  async sendQuizResultsEmail(data: QuizResultsEmailData): Promise<void> {
    const resultsUrl = `${this.frontendUrl}/results/${data.submissionId}`;
    const { htmlBody, textBody } = this.buildEmailContent(data, resultsUrl);

    const command = new SendEmailCommand({
      Source: `${this.fromName} <${this.fromEmail}>`,
      Destination: { ToAddresses: [data.email] },
      Message: {
        Subject: { Charset: 'UTF-8', Data: '🎉 Your Hair Loss Analysis is Ready!' },
        Body: {
          Html: { Charset: 'UTF-8', Data: htmlBody },
          Text: { Charset: 'UTF-8', Data: textBody },
        },
      },
    });

    await sesClient.send(command);
  }

  private buildEmailContent(data: QuizResultsEmailData, resultsUrl: string) {
    const riskColorMap: Record<string, { bg: string; text: string }> = {
      critical: { bg: '#dc2626', text: '#ffffff' },
      high: { bg: '#f97316', text: '#ffffff' },
      medium: { bg: '#eab308', text: '#ffffff' },
      low: { bg: '#22c55e', text: '#ffffff' },
    };

    const colors = riskColorMap[(data.riskLevel || '').toLowerCase()] || riskColorMap.medium;

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Hair Loss Analysis is Ready</title>
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background-color:#f9fafb;">
  <div style="max-width:600px;margin:0 auto;background-color:#ffffff;">
    <div style="background:linear-gradient(135deg,#9333ea 0%,#ec4899 100%);padding:40px 20px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:bold;">Your Hair Loss Analysis is Ready! 🎉</h1>
    </div>
    <div style="padding:30px 20px;">
      <div style="background-color:${colors.bg};color:${colors.text};padding:20px;border-radius:12px;text-align:center;margin-bottom:30px;">
        <h2 style="margin:0 0 8px 0;font-size:24px;font-weight:bold;">Risk Level: ${(data.riskLevel || '').toUpperCase()}</h2>
        <p style="margin:0;font-size:18px;">Urgency: ${data.urgency}</p>
      </div>
      <h2 style="color:#1f2937;margin:0 0 16px 0;font-size:22px;">We've Identified Your Root Cause:</h2>
      <div style="background-color:#f3f4f6;border-left:4px solid #9333ea;padding:20px;border-radius:0 8px 8px 0;margin-bottom:30px;">
        <h3 style="color:#9333ea;margin:0 0 8px 0;font-size:20px;font-weight:bold;">${(data.primaryCauseType || '').replace('_',' ').toUpperCase()}</h3>
        <p style="margin:0 0 12px 0;color:#4b5563;font-weight:600;">${data.primaryCauseConfidence}% confident</p>
        <p style="margin:0;color:#6b7280;line-height:1.6;">${data.primaryCauseDescription}</p>
      </div>
      <div style="background-color:#fef3c7;border:1px solid #fbbf24;border-radius:8px;padding:20px;margin-bottom:30px;">
        <p style="margin:0 0 8px 0;color:#78350f;font-weight:bold;">💬 Personal Message:</p>
        <p style="margin:0;color:#92400e;line-height:1.6;">${data.specialNote}</p>
      </div>
      <div style="text-align:center;margin:40px 0;">
        <a href="${resultsUrl}" style="display:inline-block;background:linear-gradient(135deg,#9333ea 0%,#ec4899 100%);color:#ffffff;text-decoration:none;padding:18px 48px;border-radius:50px;font-weight:bold;font-size:18px;">View Your Complete Results & Treatment Plan →</a>
      </div>
      <h3 style="color:#1f2937;margin:30px 0 16px 0;font-size:20px;">What's Next?</h3>
      <ol style="color:#4b5563;line-height:2;padding-left:20px;margin:0;">
        <li>View your complete analysis and personalized treatment plan</li>
        <li>Get your recommended products (with special quiz discount)</li>
        <li>Start your 90-day hair recovery journey</li>
      </ol>
    </div>
    <div style="background-color:#f9fafb;padding:30px 20px;border-top:1px solid #e5e7eb;">
      <p style="color:#9ca3af;font-size:12px;margin:0 0 8px 0;text-align:center;">You're receiving this email because you completed the Fulani Hair Gro quiz.</p>
      <p style="color:#9ca3af;font-size:12px;margin:0;text-align:center;">© 2025 Fulani Hair Gro. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

    const textBody = `YOUR HAIR LOSS ANALYSIS IS READY!

RISK LEVEL: ${(data.riskLevel || '').toUpperCase()}
Urgency: ${data.urgency}

WE'VE IDENTIFIED YOUR ROOT CAUSE:
${(data.primaryCauseType || '').replace('_',' ').toUpperCase()} (${data.primaryCauseConfidence}% confident)

${data.primaryCauseDescription}

PERSONAL MESSAGE:
${data.specialNote}

VIEW YOUR COMPLETE RESULTS:
${resultsUrl}

WHAT'S NEXT?
1. View your complete analysis and personalized treatment plan
2. Get your recommended products (with special quiz discount)
3. Start your 90-day hair recovery journey

---
© 2025 Fulani Hair Gro. All rights reserved.
You're receiving this email because you completed the Fulani Hair Gro quiz.`;

    return { htmlBody, textBody };
  }
}
