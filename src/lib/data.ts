import fs from 'fs';
import path from 'path';

export async function getAgences() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'agences.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getContacts() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'contacts.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
