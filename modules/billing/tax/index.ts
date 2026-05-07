export interface TaxRecord {
  id: string;
  country: string;
  region?: string;
  rate: number;
  type: 'gst' | 'vat' | 'sales_tax';
}

export class TaxEngine {
  /**
   * Calculate tax for an amount
   */
  static calculateTax(amount: number, rate: number): number {
    return Math.round(amount * (rate / 100));
  }

  /**
   * Get tax rate for a country (Simplified placeholder)
   */
  static getTaxRate(country: string): number {
    const rates: Record<string, number> = {
      IN: 18, // GST
      GB: 20, // VAT
      US: 0,  // Varies by state, placeholder
    };
    return rates[country] ?? 0;
  }

  /**
   * Validate GSTIN or VAT number (Basic regex placeholder)
   */
  static validateTaxId(taxId: string, type: 'gst' | 'vat'): boolean {
    if (type === 'gst') {
      return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(taxId);
    }
    return taxId.length > 5;
  }
}
