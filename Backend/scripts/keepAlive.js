const appBaseUrl =
  process.env.APP_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  "http://localhost:5000";

const healthUrl = new URL("/api/health", appBaseUrl);

try {
  const response = await fetch(healthUrl);
  const body = await response.text();

  if (!response.ok) {
    throw new Error(
      `Health check failed with status ${response.status}: ${body}`
    );
  }

  console.log(
    `Keep-alive ping succeeded: ${healthUrl.toString()}`
  );
  process.exit(0);
} catch (error) {
  console.error(
    `Keep-alive ping failed for ${healthUrl.toString()}:`,
    error.message
  );
  process.exit(1);
}