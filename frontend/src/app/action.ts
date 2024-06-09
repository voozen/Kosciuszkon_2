'use server';

export async function getType() {
  const res = await fetch('http://localhost:5000/take', { cache: 'no-store' });
  const data = await res.json();
  return data;
}
