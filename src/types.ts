import React from 'react';
import * as z from 'zod';

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export type Role = 'admin' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Member {
  id: string;
  name: string;
  fatherName: string;
  cnic: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  location: 'Soan Garden' | 'Bahria Town';
  paymentMode: 'Bank Transfer' | 'Cash' | 'Easypaisa' | 'Jazzcash' | 'Other';
  joinDate: string;
  status: 'active' | 'inactive';
  packageId: string;
  packageName?: string;
  startDate?: string;
}

export interface Employee {
  id: string;
  name: string;
  cnic: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface Trainer {
  id: string;
  name: string;
  cnic: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  specialization: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface Package {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  status: 'active' | 'inactive';
}

// Dialog Schemas
export const memberSchema = z.object({
  name: z.string().min(1, 'This Field is required'),
  fatherName: z.string().min(1, 'This Field is required'),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, 'Invalid CNIC format (e.g. 12345-1234567-1)').min(1, 'This Field is required'),
  gender: z.enum(['male', 'female', 'other']),
  phone: z.string().regex(/^\d{4}-\d{7}$/, 'Invalid Phone format (e.g. 0300-1234567)').min(1, 'This Field is required'),
  location: z.enum(['Soan Garden', 'Bahria Town']),
  paymentMode: z.enum(['Bank Transfer', 'Cash', 'Easypaisa', 'Jazzcash', 'Other']),
  packageName: z.string().min(1, 'This Field is required'),
  startDate: z.string().min(1, 'This Field is required').optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export type MemberFormValues = z.infer<typeof memberSchema>;

export const employeeSchema = z.object({
  name: z.string().min(1, 'This Field is required'),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, 'Invalid CNIC format (e.g. 12345-1234567-1)').min(1, 'This Field is required'),
  gender: z.enum(['male', 'female', 'other']),
  phone: z.string().regex(/^\d{4}-\d{7}$/, 'Invalid Phone format (e.g. 0300-1234567)').min(1, 'This Field is required'),
  role: z.string().min(1, 'This Field is required'),
  status: z.enum(['active', 'inactive']).optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;

export const trainerSchema = z.object({
  name: z.string().min(1, 'This Field is required'),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, 'Invalid CNIC format (e.g. 12345-1234567-1)').min(1, 'This Field is required'),
  gender: z.enum(['male', 'female', 'other']),
  phone: z.string().regex(/^\d{4}-\d{7}$/, 'Invalid Phone format (e.g. 0300-1234567)').min(1, 'This Field is required'),
  specialization: z.string().min(1, 'This Field is required'),
  status: z.enum(['active', 'inactive']).optional(),
});

export type TrainerFormValues = z.infer<typeof trainerSchema>;

export const packageSchema = z.object({
  name: z.string().min(1, 'This Field is required'),
  price: z.string().min(1, 'This Field is required'),
  duration: z.string().min(1, 'This Field is required'),
  description: z.string().min(1, 'This Field is required'),
  status: z.enum(['active', 'inactive']).optional(),
});

export type PackageFormValues = z.infer<typeof packageSchema>;
