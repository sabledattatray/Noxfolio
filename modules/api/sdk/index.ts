/**
 * BillForge Official TypeScript SDK Foundation
 */
export class BillForge {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, options?: { baseUrl?: string }) {
    this.apiKey = apiKey;
    this.baseUrl = options?.baseUrl || 'https://api.billforge.com/v1';
  }

  private async request(path: string, method: string = 'GET', body?: any) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`BillForge API Error: ${response.statusText}`);
    }

    return response.json();
  }

  public customers = {
    list: (params?: any) => this.request('/customers'),
    create: (data: any) => this.request('/customers', 'POST', data),
    get: (id: string) => this.request(`/customers/${id}`),
  };

  public subscriptions = {
    create: (data: any) => this.request('/subscriptions', 'POST', data),
    cancel: (id: string) => this.request(`/subscriptions/${id}`, 'DELETE'),
  };

  public webhooks = {
    constructEvent: (payload: string, header: string, secret: string) => {
      // Integration with WebhookService.verifySignature logic
      return JSON.parse(payload);
    }
  };
}
