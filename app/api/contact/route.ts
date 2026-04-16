import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  interest?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!body.email?.trim() || !/\S+@\S+\.\S+/.test(body.email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Log the submission (replace with actual email/CRM integration)
    console.log('📬 New inquiry from:', {
      name: body.name,
      company: body.company || 'N/A',
      email: body.email,
      interest: body.interest || 'Not specified',
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // TODO: Integrate with CRM (HubSpot, Salesforce, etc.)
    // Example:
    // await sendEmail({ to: 'darenli@corewin.com.hk', ...body });
    // await createCRMLead(body);

    return NextResponse.json(
      { success: true, message: 'Inquiry received. We will respond within one business day.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
