'use server';

import { G } from '@mobily/ts-belt';
import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth/session';

import type { Chat } from '@/lib/types';

export async function getChats(userId?: string | null) {
  if (G.isNullable(userId)) {
    return [];
  }

  try {
    const pipeline = kv.pipeline();
    const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
      rev: true
    });

    for (const chat of chats) {
      pipeline.hgetall(chat);
    }

    const results = await pipeline.exec();

    return results as Chat[];
  } catch {
    return [];
  }
}

export async function getChat(id: string, userId: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`);

  if (!chat || (userId && chat.userId !== userId)) {
    return null;
  }

  return chat;
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const currentUser = await getCurrentUser();

  if (G.isNullable(currentUser)) {
    return {
      error: 'Unauthorized'
    };
  }

  const uid = await kv.hget<string>(`chat:${id}`, 'userId');

  if (uid !== currentUser.id) {
    return {
      error: 'Unauthorized'
    };
  }

  await kv.del(`chat:${id}`);
  await kv.zrem(`user:chat:${currentUser.id}`, `chat:${id}`);

  revalidatePath('/');
  revalidatePath(path);

  return {
    success: true
  };
}

export async function clearChats() {
  const currentUser = await getCurrentUser();

  if (G.isNullable(currentUser)) {
    return {
      error: 'Unauthorized'
    };
  }

  const chats: string[] = await kv.zrange(`user:chat:${currentUser.id}`, 0, -1);
  if (!chats.length) {
    return redirect('/');
  }
  const pipeline = kv.pipeline();

  for (const chat of chats) {
    pipeline.del(chat);
    pipeline.zrem(`user:chat:${currentUser.id}`, chat);
  }

  await pipeline.exec();

  revalidatePath('/');
  return redirect('/');
}

export async function getSharedChat(id: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`);

  if (G.isNullable(chat?.sharePath)) {
    return null;
  }

  return chat;
}

export async function shareChat(chat: Chat) {
  const currentUser = await getCurrentUser();

  if (G.isNullable(currentUser) || currentUser.id !== chat.userId) {
    return {
      error: 'Unauthorized'
    };
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  };

  await kv.hmset(`chat:${chat.id}`, payload);

  return payload;
}
