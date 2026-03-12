import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/search-index";

// Pre-build the index at build time
const index = buildSearchIndex();

export async function GET() {
  return NextResponse.json(index);
}
