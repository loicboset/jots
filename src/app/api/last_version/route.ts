import fs from "fs";
import path from "path";

export async function GET(): Promise<Response> {
  const versionsDir = path.join(process.cwd(), "versions");
  const files = fs.readdirSync(versionsDir);
  const lastFile = path.join(versionsDir, files[0]);
  const lastVersion = JSON.parse(fs.readFileSync(lastFile, "utf8")).version;

  return new Response(JSON.stringify(lastVersion), { status: 200 });
}
