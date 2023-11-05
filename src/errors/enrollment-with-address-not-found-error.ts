import { ApplicationError } from '@/protocols';

export function enrollmentAddressNotFoundError(): ApplicationError {
  return {
    name: 'EnrollmentAddressNotFoundError',
    message: 'Enrollment does not have an address!',
  };
}
