// Ticket Types
export interface Ticket {
  id: any;
  title: string;
  description?: any;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  created_at: string;
}

export type TicketStatus = 'open' | 'in_progress' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface TicketFormData {
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
}


// User Types
export  interface User {
  name?: string;
  email: string;
  password: string;
}

export  interface Session {
  token: string;
  email: string;
}

// Auth Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
}

// Toast Types
export interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

// Form Error Types
export interface FormErrors {
  [key: string]: string;
}

// Statistics Types
export interface TicketStats {
  total: number;
  open: number;
  in_progress: number;
  closed: number;
}

export interface PriorityStats {
  high: number;
  medium: number;
  low: number;
}