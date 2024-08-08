'use server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { z } from 'zod';
import prisma from './lib/db';
import { CategoryTypes } from '@prisma/client';

export type State = {
  status: 'error' | 'success' | undefined;
  error?: {
    [key: string]: string[];
  };
  message?: string | null;
};

//定義商品的schema及驗證
const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  category: z.string().min(1, { message: 'Category must be selected' }),
  price: z.number().min(1, { message: 'Price must be at least 1' }),
  smallDescription: z.string().min(10, {
    message: 'Small description must be at least 10 characters long',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters long',
  }),
  images: z.array(z.string(), {
    message: 'At least 1 image must be uploaded',
  }),
  productFile: z.string().min(1, {
    message: 'At least 1 file must be uploaded',
  }),
});

const userSettingSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First name must be at least 3 characters long' })
    .or(z.literal(''))
    .optional(),
  lastName: z
    .string()
    .min(3, { message: 'Last name must be at least 3 characters long' })
    .or(z.literal(''))
    .optional(),
});

//
export async function SellProduct(preState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('User not found');
  }
  //server action驗證表單欄位
  const validateFields = productSchema.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    price: Number(formData.get('price')),
    smallDescription: formData.get('smallDescription'),
    description: formData.get('description'),
    images: JSON.parse(formData.get('images') as string),
    productFile: formData.get('productFile'),
  });

  if (!validateFields.success) {
    const state: State = {
      status: 'error',
      error: validateFields.error.flatten().fieldErrors,
      message: 'Error validating fields',
    };
    return state;
  }
  //推送到prisma
  await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      price: validateFields.data.price,
      smallDescription: validateFields.data.smallDescription,
      description: JSON.parse(validateFields.data.description),
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      userId: user.id,
    },
  });

  const state: State = {
    //驗證成功，執行其他動作
    status: 'success',
    message: 'Product uploaded successfully',
  };
  return state;
}

export async function UpdateUserSettings(preState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error('User not found');
  }
  const validateFields = userSettingSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  });

  if (!validateFields.success) {
    const state: State = {
      status: 'error',
      error: validateFields.error.flatten().fieldErrors,
      message: 'Error validating fields',
    };
    return state;
  }
  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  const state: State = {
    status: 'success',
    message: 'Settings updated successfully',
  };
  return state;
}
