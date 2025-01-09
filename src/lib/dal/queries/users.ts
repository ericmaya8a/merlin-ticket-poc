"use server";

export async function getUser() {
  const result = await fetch("http://localhost:3000/api/user");
  return await result.json();
}
