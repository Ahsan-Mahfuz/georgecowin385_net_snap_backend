// Xero Accounting integration via a **Custom Connection** (OAuth2 client-credentials
// grant — no browser redirect, backend-only). If credentials are not configured it
// falls back to a deterministic simulated draft so the invoicing flow works without
// a Xero account. To go live, set XERO_CLIENT_ID / XERO_CLIENT_SECRET / XERO_TENANT_ID.

const XERO_TOKEN_URL = "https://identity.xero.com/connect/token";
const XERO_INVOICE_URL = "https://api.xero.com/api.xro/2.0/Invoices";

export interface XeroInvoiceInput {
  contactName: string;
  description: string;
  amount: number;
  currency?: string;
  reference?: string;
  accountCode?: string;
}

export interface XeroInvoiceResult {
  invoiceId: string;
  invoiceNumber: string;
  status: string;
  online: boolean; // true when it hit the real Xero API
}

export function isXeroConfigured(): boolean {
  return Boolean(
    process.env.XERO_CLIENT_ID && process.env.XERO_CLIENT_SECRET && process.env.XERO_TENANT_ID,
  );
}

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(
    `${process.env.XERO_CLIENT_ID}:${process.env.XERO_CLIENT_SECRET}`,
  ).toString("base64");
  const res = await fetch(XERO_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=accounting.transactions accounting.contacts",
  });
  if (!res.ok) throw new Error(`Xero token error ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function createXeroInvoice(input: XeroInvoiceInput): Promise<XeroInvoiceResult> {
  // Fallback: simulated draft so the flow works without Xero credentials.
  if (!isXeroConfigured()) {
    const id = `SIM-${Date.now().toString(36).toUpperCase()}`;
    return {
      invoiceId: id,
      invoiceNumber: id,
      status: "Draft (simulated — connect Xero to create for real)",
      online: false,
    };
  }

  const token = await getAccessToken();
  const body = {
    Invoices: [
      {
        Type: "ACCREC",
        Contact: { Name: input.contactName || "Client" },
        LineItems: [
          {
            Description: input.description || "Cowshed invoice",
            Quantity: 1,
            UnitAmount: Number(input.amount || 0),
            AccountCode: input.accountCode || process.env.XERO_ACCOUNT_CODE || "200",
          },
        ],
        Reference: input.reference || "",
        Status: "DRAFT",
        CurrencyCode: input.currency || "GBP",
      },
    ],
  };

  const res = await fetch(XERO_INVOICE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Xero-Tenant-Id": String(process.env.XERO_TENANT_ID),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Xero invoice error ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as {
    Invoices?: { InvoiceID: string; InvoiceNumber: string; Status: string }[];
  };
  const inv = data.Invoices?.[0];
  return {
    invoiceId: inv?.InvoiceID || "",
    invoiceNumber: inv?.InvoiceNumber || "",
    status: `Draft invoice created in Xero (${inv?.Status || "DRAFT"})`,
    online: true,
  };
}
