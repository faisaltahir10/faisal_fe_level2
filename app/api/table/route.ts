// src/app/api/profile/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.query(
      'select a.*,b.owner_name from products a left join products_owners c on a.product_id = c.product_id left join owners b on b.id = c.owners_id'
    );

    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
