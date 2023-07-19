import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

const PORT = 8000;

const app = new Hono();

// Custom Not Found Message
app.notFound((c) => c.json({ message: "Not found" }, 404));
// Error handling
app.onError((err, c) => c.json({ message: "Internal Server Error" }, 500));

app.get("/", prettyJSON(), (c) => {
  return c.json({ message: "Hello World" });
});

app.get("/:name", (c) => {
  const name = c.req.param("name");
  return c.json({ message: `Hello ${name}` });
});

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
