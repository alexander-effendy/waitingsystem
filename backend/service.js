import { InputError } from './error.js';

let waitlist = [];

export const addToWaitlist = (customer) => {
  if (!customer.name || !customer.size) {
    throw new InputError('Customer name and size are required');
  }
  const newCustomer = {
    id: waitlist.length + 1,
    ...customer,
    status: 'waiting', // Possible statuses: waiting, served, cancelled
  };
  waitlist.push(newCustomer);
  return newCustomer;
};

export const updateStatus = (customerId, status) => {
  const index = waitlist.findIndex(customer => customer.id === customerId);
  if (index === -1) {
    throw new InputError('Customer not found');
  }
  waitlist[index].status = status;
  return waitlist[index];
};

export const getWaitlist = () => {
  return waitlist;
};

export const removeCustomer = (customerId) => {
  const index = waitlist.findIndex(customer => customer.id === customerId);
  if (index === -1) {
    throw new InputError('Customer not found');
  }
  waitlist = waitlist.filter(customer => customer.id !== customerId);
  return { message: 'Customer removed successfully' };
};

export const clearWaitlist = () => {
  waitlist = [];
  return { message: 'Waitlist has been cleared successfully' };
}
