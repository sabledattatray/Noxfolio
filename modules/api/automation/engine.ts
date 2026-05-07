import { EventBus } from '../events';

export interface WorkflowAction {
  type: 'email' | 'webhook' | 'notification' | 'internal_action';
  payload: any;
}

export interface WorkflowTrigger {
  event: string;
  conditions?: Record<string, any>;
  actions: WorkflowAction[];
}

export class WorkflowEngine {
  /**
   * Process a triggered event and execute associated workflows
   */
  static async processTrigger(event: string, payload: any) {
    console.log(`[WORKFLOW] Triggered event: ${event}`);
    
    // In a real app, fetch active workflows from DB matching the event
    // For now, we'll implement a static example
    if (event === 'invoice.payment_failed') {
      await this.executeAction({
        type: 'email',
        payload: { template: 'payment_failed', to: payload.email },
      });
      
      await this.executeAction({
        type: 'webhook',
        payload: { url: 'https://api.customer.com/webhooks', event: 'payment.failed' },
      });
    }
  }

  private static async executeAction(action: WorkflowAction) {
    console.log(`[WORKFLOW] Executing action: ${action.type}`, action.payload);
    
    // Delegate to appropriate queue for execution
    await EventBus.emit('workflow-actions', action.type, action.payload);
  }
}
