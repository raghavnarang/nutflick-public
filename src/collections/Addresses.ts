import { isAdminOrCustomer } from '@/access/admin-or-customer'
import { isAdminOrSelfCustomer } from '@/access/admin-or-self-customer'
import states from '@/features/states.json'
import type { CollectionConfig } from 'payload'

export const Addresses: CollectionConfig = {
  slug: 'addresses',
  access: {
    create: isAdminOrCustomer,
    read: isAdminOrSelfCustomer,
    update: isAdminOrSelfCustomer,
    delete: isAdminOrSelfCustomer,
  },
  admin: {
    useAsTitle: 'address',
  },
  fields: [
    {
      type: 'relationship',
      name: 'customer',
      required: true,
      relationTo: ['customers'],
      hooks: {
        beforeValidate: [
          ({ req: { user }, value }) =>
            user?.collection === 'customers' ? { value: user.id, relationTo: 'customers' } : value,
        ],
      },
      access: {
        create: ({ req: { user }, data }) =>
          user?.collection === 'users' ||
          (user?.collection === 'customers' && data?.customer?.value === user.id),
        update: ({ req: { user }, data }) =>
          user?.collection === 'users' ||
          (user?.collection === 'customers' && data?.customer?.value === user.id),
        read: ({ req: { user } }) => user?.collection === 'users',
      },
    },
    {
      type: 'text',
      name: 'name',
      required: true,
    },
    {
      type: 'textarea',
      name: 'address',
      required: true,
    },
    {
      type: 'text',
      name: 'phone',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'city',
          required: true,
        },
        {
          type: 'select',
          name: 'state',
          required: true,
          options: Object.entries(states).map(([value, label]) => ({ label, value })),
        },
        {
          type: 'text',
          name: 'pincode',
          required: true,
        },
      ],
    },
  ],
}
