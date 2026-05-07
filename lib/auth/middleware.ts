import { z } from 'zod';
import { OrganizationDataWithMembers, User } from '@/lib/db/schema';
import { getOrganizationForUser, getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    return action(result.data, formData);
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: User
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const user = await getUser();
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    return action(result.data, formData, user);
  };
}

type ActionWithOrganizationFunction<T> = (
  formData: FormData,
  organization: OrganizationDataWithMembers
) => Promise<T>;

export function withOrganization<T>(action: ActionWithOrganizationFunction<T>) {
  return async (...args: any[]): Promise<T> => {
    const user = await getUser();
    if (!user) {
      redirect('/sign-in');
    }

    const organization = await getOrganizationForUser();
    if (!organization) {
      throw new Error('Organization not found');
    }

    // Determine which argument is FormData based on the call signature
    let formData: FormData;
    if (args[0] instanceof FormData) {
      formData = args[0];
    } else if (args[1] instanceof FormData) {
      formData = args[1];
    } else {
      formData = new FormData();
    }

    return action(formData, organization);
  };
}
