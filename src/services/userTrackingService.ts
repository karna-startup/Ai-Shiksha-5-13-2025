/**
 * User Tracking Service
 * 
 * Tracks user actions and sends them to the backend webhook
 */

const TRACKING_WEBHOOK_URL = 'https://karna-devops1.app.n8n.cloud/webhook-test/user-action';

// Generate a session ID to identify the user session
const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

export interface UserAction {
  actionType: string;         // Type of action (click, pageview, etc.)
  elementId?: string;         // ID of the element interacted with (if applicable)
  elementType?: string;       // Type of element (button, link, etc.)
  currentPath: string;        // Current URL path
  timestamp: string;          // ISO timestamp of the action
  sessionId: string;          // Session identifier
  additionalData?: Record<string, any>; // Any additional data to track
}

/**
 * Track a user action and send it to the webhook
 */
export const trackUserAction = async (action: Omit<UserAction, 'timestamp' | 'sessionId' | 'currentPath'>) => {
  try {
    const currentPath = window.location.pathname;
    
    const payload: UserAction = {
      ...action,
      currentPath,
      timestamp: new Date().toISOString(),
      sessionId,
    };
    
    console.log('Tracking user action:', payload);
    
    // Send to webhook
    await fetch(TRACKING_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      // Use keepalive to ensure the request completes even if the page is unloading
      keepalive: true
    });
    
    return true;
  } catch (error) {
    console.error('Failed to track user action:', error);
    return false;
  }
};

/**
 * Track a page view event
 */
export const trackPageView = () => {
  return trackUserAction({
    actionType: 'pageview',
    additionalData: {
      title: document.title,
      referrer: document.referrer,
    }
  });
};

/**
 * Track a click event
 */
export const trackClick = (elementId: string, elementType: string, additionalData?: Record<string, any>) => {
  return trackUserAction({
    actionType: 'click',
    elementId,
    elementType,
    additionalData
  });
};

/**
 * Create a click handler that tracks the click
 */
export const withTracking = (
  onClick: (e: React.MouseEvent) => void,
  elementId: string,
  elementType: string,
  additionalData?: Record<string, any>
) => {
  return (e: React.MouseEvent) => {
    trackClick(elementId, elementType, additionalData);
    onClick(e);
  };
};
