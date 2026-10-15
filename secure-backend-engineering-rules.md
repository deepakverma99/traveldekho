# Secure Backend Engineering Rules
## Production checklist for NestJS, Node.js, APIs, databases, and VPS deployments

> **Purpose:** A practical security standard for building and operating production backends, including e-commerce systems.
>
> **Audience:** Backend developers, reviewers, DevOps engineers, and technical leads.
>
> **Important:** No checklist guarantees a system is attack-proof. Apply these controls according to your threat model, business requirements, data sensitivity, traffic profile, and legal obligations. Test security controls and keep them maintained.

---

## 1. Core principles

1. **Secure by default.** New endpoints, services, storage buckets, and infrastructure should start with the most restrictive practical settings.
2. **Least privilege.** Every user, service, process, database role, token, and deployment credential receives only the permissions it needs.
3. **Never trust client input.** Treat all request parameters, headers, cookies, files, webhook payloads, and forwarded headers as untrusted.
4. **Validate at system boundaries.** Validate input when it enters the system and verify assumptions again where security-sensitive decisions are made.
5. **Authorize every sensitive action.** Being authenticated does not imply permission to access every record or perform every operation.
6. **Fail safely.** On uncertainty or security-check failure, deny sensitive operations rather than allowing them.
7. **Keep secrets out of code and logs.** Never commit, print, expose, or return credentials and tokens.
8. **Limit resource consumption.** Bound request sizes, execution time, concurrency, query cost, pagination, uploads, retries, and queue depth.
9. **Make sensitive operations auditable.** Record who did what and when, without logging secrets or unnecessary personal data.
10. **Assume controls can fail.** Use layered defenses, monitoring, backups, incident response, and recovery tests.
11. **Prefer proven libraries and protocols.** Do not invent cryptography, authentication protocols, or payment-verification schemes.
12. **Security is continuous.** Review security during design, coding, testing, deployment, and maintenance.

## 2. Threat modeling before implementation

For each service or feature:

- Identify assets: credentials, personal information, payments, orders, inventory, business secrets, infrastructure access, and availability.
- Identify trust boundaries: browser-to-API, API-to-database, API-to-payment provider, worker-to-queue, and CI/CD-to-production.
- List realistic threats: account takeover, injection, broken access control, data leakage, abuse, fraud, denial of service, supply-chain compromise, and insider misuse.
- Identify the attacker capabilities and the impact if each control fails.
- Document mitigations, owners, residual risks, and tests.
- Revisit the threat model when adding new integrations, permissions, data types, or public endpoints.

Use the OWASP Top 10 and OWASP API Security Top 10 as useful baselines, not as a substitute for application-specific threat modeling.

## 3. Architecture and boundaries

- Keep the frontend, API, background workers, database, cache, object storage, and administrative interfaces in appropriately separated trust zones.
- Expose only required public entry points. Keep database and cache ports private.
- Place a maintained reverse proxy and, where appropriate, a CDN/WAF/DDoS service in front of public traffic.
- Do not expose internal service ports directly unless there is a documented need and access control.
- Use TLS for public traffic and for service-to-service/database connections when traffic crosses an untrusted network.
- Separate development, staging, and production environments, credentials, data, and permissions.
- Do not use real production personal data in development unless specifically approved and appropriately protected.
- Avoid putting secrets or sensitive business logic in frontend code.
- Use explicit service contracts and narrow internal APIs.
- Avoid unnecessary microservices. More services create more credentials, network boundaries, and operational failure modes.
- Define health checks that reveal minimal information and do not expose environment variables, dependency credentials, stack traces, or detailed topology.

## 4. VPS and operating-system hardening

- Keep the operating system and installed packages security-patched.
- Use SSH keys or another strong, centrally managed access method. Disable password SSH and root SSH login when operationally appropriate and after confirming recovery access.
- Restrict SSH and administrative panels to trusted IP ranges or a secure access network where possible.
- Enable host and provider firewalls. Publicly expose only required ports, usually 80/443 and restricted administrative access.
- Never expose PostgreSQL, MySQL, MongoDB, Redis, Docker daemon, or internal dashboards to the public internet without a compelling, reviewed design.
- Run application processes as non-root users.
- Use systemd or a properly configured container orchestrator for process supervision, restart behavior, and resource limits.
- Set file and directory permissions to the minimum required.
- Store secrets in a secret manager or securely provisioned environment; protect any secret files with strict ownership and permissions.
- Configure disk-space alerts, log rotation, time synchronization, CPU/memory monitoring, and process-restart alerts.
- Keep a documented, tested recovery route before changing firewall or SSH settings.
- If compromise is suspected, isolate the host, preserve evidence where appropriate, rotate affected credentials from a clean environment, and rebuild from trusted images rather than assuming cleanup restored trust.

## 5. HTTPS, reverse proxy, and edge protection

- Use valid TLS certificates and automate renewal monitoring.
- Redirect HTTP to HTTPS.
- Use secure TLS configurations supported by your hosting environment; remove obsolete protocols and weak cipher suites according to current platform guidance.
- Configure security headers using a maintained library such as Helmet. Review Content Security Policy separately for the frontend.
- Set appropriate request-body limits at both proxy and application layers.
- Configure connection, header, body, and upstream timeouts to prevent slow-client and resource-exhaustion attacks.
- Use proxy-level connection/rate limits as one layer, not the only layer.
- Apply CDN/WAF rules and upstream DDoS protection appropriate to your service.
- Restrict direct origin access where feasible, for example by allowing only the CDN's published origin-facing IP ranges. Maintain these ranges as they change.
- Configure trusted proxy handling precisely. Never blindly trust arbitrary `X-Forwarded-For`, `X-Real-IP`, or similar client-supplied headers.
- Test rate limiting and client-IP restoration from both trusted and untrusted network paths.
- Understand that application rate limiting cannot stop network-layer traffic that saturates the VPS connection before reaching the application.

## 6. NestJS bootstrap baseline

- Keep NestJS, Node.js, and dependencies on supported, patched versions.
- Use a maintained HTTP adapter and understand adapter-specific behavior.
- Enable Helmet and configure CORS with explicit trusted origins.
- Do not treat CORS as authentication or DDoS protection.
- Use a global `ValidationPipe` with `whitelist: true`, `forbidNonWhitelisted: true`, and `transform: true` where suitable.
- Add explicit DTO constraints and nested validation; validate arrays, dates, numbers, enums, identifiers, and uploaded metadata.
- Set JSON and URL-encoded body-size limits. Configure multipart limits separately.
- Return generic client-facing errors in production. Do not expose stack traces, SQL, filesystem paths, environment variables, or internal service responses.
- Register authentication, authorization, throttling, and exception handling deliberately. Verify guard ordering and route metadata.
- Disable or protect Swagger/OpenAPI and diagnostic endpoints in production as appropriate.
- Configure a shutdown hook and graceful termination so in-flight work and database connections close cleanly.
- Bind the application to a private interface or internal network when a reverse proxy is intended to be the only public entry point.
- Use configuration validation at startup. Fail startup if required production secrets or settings are missing or invalid.
- Do not log full request bodies by default.

Illustrative baseline (adapt and test with your installed NestJS and Express/Fastify versions):

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: ['https://yourstore.example'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000, '127.0.0.1');
}

bootstrap();
```

This example is not a complete configuration. Configure body parsing limits, multipart handling, proxy trust, throttling, TLS termination, and environment validation explicitly. Confirm that your proxy can reach the chosen bind address.

## 7. Input validation and output handling

- Treat path parameters, query parameters, body fields, headers, cookies, and files as untrusted.
- Validate type, format, length, range, allowed values, and relationships between fields.
- Reject unknown fields for security-sensitive DTOs rather than silently accepting arbitrary properties.
- Apply maximum lengths to strings and arrays.
- Set upper bounds on pagination, batch size, nesting depth, and filter complexity.
- Parse IDs into expected types and reject malformed values consistently.
- Normalize values only when the business domain supports it. Avoid destructive normalization of passwords or security tokens.
- Use allowlists for sort keys, field selection, and filter operators.
- Encode output for its destination. HTML, JavaScript, URLs, SQL, and shell commands have different escaping rules.
- Do not rely on regular expressions alone for complex structured formats.
- Validate file content and size, not just extension or client-supplied MIME type.
- Treat data returned by external APIs as untrusted too.
- Do not use validation as a replacement for parameterized queries or authorization.

## 8. SQL, NoSQL, and command injection

- Use parameterized queries and safe ORM APIs.
- Never concatenate user input into SQL, shell commands, LDAP filters, or other interpreters.
- Do not pass client-controlled objects directly into MongoDB filters or operators.
- Allowlist dynamic column names, sort direction, table names, and other query components that cannot be parameterized.
- Avoid unsafe raw-query APIs unless values are parameterized and the use has been reviewed.
- Never let clients submit arbitrary query fragments or database operators.
- Use a dedicated database account with only required table/schema permissions.
- Use separate migration credentials where appropriate; do not give the runtime application unnecessary schema-administration privileges.
- Set query timeouts and monitor slow queries where supported.
- Return only required columns and records.
- Do not expose database error details to clients.
- Test injection cases with safe, authorized test data.

Unsafe:

```typescript
const sql = `SELECT * FROM users WHERE email = '${email}'`;
```

Safer PostgreSQL example:

```typescript
const rows = await dataSource.query(
  'SELECT id, email FROM users WHERE email = $1',
  [email],
);
```

The placeholder syntax varies by driver. ORM usage is safe only when used through parameterized APIs; raw query methods still require care.

## 9. Authentication and session security

- Use a well-maintained authentication library and standard protocols where possible.
- Hash passwords with Argon2id or a suitably configured bcrypt implementation. Never store plaintext or reversibly encrypted passwords.
- Set password length and abuse controls. Do not impose arbitrary complexity rules as the only defense.
- Use a secure password-reset flow with random, short-lived, single-use tokens. Store a hash of reset tokens where practical.
- Do not reveal whether an email or account exists through login, registration, or password-reset responses when that creates account-enumeration risk.
- Rate-limit login, registration, password reset, OTP, and MFA verification.
- Use MFA for administrators and other high-risk accounts.
- If using JWTs, verify signature, algorithm, expiry, issuer, and audience as applicable. Never accept an algorithm or key choice supplied by an untrusted token.
- Keep access tokens short-lived where practical and design refresh-token rotation, reuse detection, revocation, and session invalidation deliberately.
- Do not put long-lived secrets in URLs.
- For browser sessions, use secure cookies with `HttpOnly`, `Secure`, and an appropriate `SameSite` policy; protect state-changing requests against CSRF when required by the cookie/session design.
- Store browser tokens according to a documented threat model; avoid exposing long-lived credentials to JavaScript when a secure cookie-based design is appropriate.
- Invalidate sessions after password resets, account recovery, or suspected compromise according to policy.
- Protect account recovery as carefully as login.
- Avoid custom cryptographic token generation. Use cryptographically secure random generators.

## 10. Authorization and access control

- Deny by default.
- Authenticate first, then authorize each operation.
- Check permissions on every sensitive request, not only in the frontend or route menu.
- Enforce object ownership in the database query or service logic. Never trust a customer ID, tenant ID, role, price, or ownership field from the request body.
- Prevent Broken Object Level Authorization (BOLA/IDOR) by checking access to each record.
- Apply role/permission checks to admin, seller, customer, support, and internal-service actions.
- Use explicit DTOs and response models to prevent mass assignment and excessive data exposure.
- Never spread an arbitrary request body directly into an ORM create/update call.
- Keep privilege changes, refunds, exports, and account recovery behind explicit permissions and, where appropriate, re-authentication or approval.
- Enforce tenant isolation in every query and background job in multi-tenant applications.
- Test both allowed and denied access paths.
- Ensure background workers enforce authorization assumptions at the time a job is created and executed.

Example: retrieve a customer's order using both the order ID and authenticated customer ID, rather than retrieving by order ID alone.

```sql
SELECT id, status, total
FROM orders
WHERE id = $1 AND customer_id = $2;
```

The customer ID must come from the authenticated server-side identity, not from client input.

## 11. Rate limiting, brute force, and abuse prevention

- Apply global rate limits and stricter route-specific limits.
- Use a shared store such as Redis when multiple app instances must enforce a common limit.
- Combine limits by IP, account, API key, tenant, and operation where appropriate.
- Trust client IP information only when it comes through a configured trusted proxy chain.
- Rate-limit login attempts, OTP delivery, password resets, search, exports, checkout, uploads, and expensive reports.
- Use progressive delays, temporary throttles, risk-based challenges, and alerting where appropriate; avoid lockout policies that let attackers permanently deny service to victims.
- Set spending limits for SMS, email, payment, and other metered providers.
- Set per-user and global concurrency caps for expensive work.
- Apply maximum batch sizes and bounded queue depth.
- Use idempotency keys for retryable state-changing operations.
- Monitor distributed abuse, credential stuffing, scraping, coupon abuse, and account creation patterns.
- Do not assume IP-only rate limiting is sufficient.
- Do not treat a `429` response as the only defense against denial of service.
- Load-test limits and verify behavior across restarts and multiple instances.

NestJS's `@nestjs/throttler` is one option. Configure its tracker, storage, proxy behavior, and endpoint policies deliberately; do not copy example limits without measuring real traffic.

## 12. DDoS and resource-exhaustion protection

- Use upstream DDoS mitigation and a CDN/WAF when appropriate.
- Apply connection, request-rate, and body-size limits at the edge and reverse proxy.
- Configure timeouts for incoming requests, database operations, outbound HTTP calls, and worker jobs.
- Cap pagination, sort complexity, regex/search complexity, file sizes, decompression work, and JSON nesting where relevant.
- Use bounded database connection pools and bounded queues.
- Prevent unbounded promises, in-memory collections, and unbounded concurrency.
- Use caching for suitable public or safely partitioned data.
- Apply circuit breakers or graceful degradation to failing downstream services.
- Avoid retry storms: use bounded retries, exponential backoff, jitter, and retry budgets.
- Limit expensive exports, reports, image processing, and bulk jobs.
- Monitor CPU, memory, event-loop lag, connection pools, queue depth, latency, error rate, and network saturation.
- Define overload behavior: reject, defer, or degrade safely rather than exhausting all resources.
- Recognize that application-level controls cannot prevent an attack that saturates the network link before traffic reaches your server.

## 13. Database security and data integrity

- Keep the database private and require authentication.
- Use least-privilege database roles and strong, unique credentials.
- Encrypt connections when crossing untrusted networks.
- Enable supported encryption-at-rest features where required by the threat model and compliance obligations.
- Use transactions for related changes that must succeed or fail together.
- Use unique constraints, foreign keys, check constraints, and appropriate indexes to enforce invariants at the database layer.
- Use optimistic or pessimistic locking / atomic updates where concurrent requests can corrupt inventory or balances.
- Design migrations to be reviewed, repeatable, and recoverable.
- Avoid exposing sequential IDs as a security boundary; IDs are identifiers, not authorization.
- Back up databases regularly, encrypt backups, restrict backup access, and keep copies outside the primary VPS.
- Test restoration and recovery time, not just backup creation.
- Set retention and deletion policies for personal data and backups.
- Audit privileged database access and investigate unexpected changes.
- Do not rely solely on application validation for critical integrity rules.

## 14. E-commerce and payment security

- Recalculate product prices, discounts, taxes, shipping, and order totals on the server from trusted records.
- Never accept a frontend claim that an order is paid.
- Verify payment status server-to-server or through a cryptographically authenticated webhook.
- Verify webhook signatures exactly as required by the provider, using the raw request body when required by the provider's verification scheme.
- Protect webhook endpoints against replay and duplicate processing.
- Store provider event IDs and enforce idempotent event handling.
- Use a well-defined order/payment state machine; reject invalid state transitions.
- Use transactions and concurrency controls to avoid overselling or duplicate refunds.
- Use idempotency keys for checkout and payment-creation operations where supported.
- Do not log card data, payment secrets, or full webhook credentials.
- Prefer hosted checkout or tokenized payment flows. Do not store raw card details unless you have the required expertise, approvals, and compliant architecture.
- Validate coupon eligibility, usage limits, expiry, account limits, and cart requirements on the server.
- Require stronger permissions and audit trails for refunds, manual payment changes, price changes, and inventory adjustments.
- Reconcile local order states against payment-provider records.
- Test failure paths: payment succeeded but callback was delayed, webhook was duplicated, client disconnected, and provider timed out.

## 15. File uploads and object storage

- Allowlist accepted file types and validate content signatures where appropriate.
- Enforce size, count, and rate limits.
- Generate server-side filenames; do not use user filenames as storage paths.
- Prevent path traversal and archive extraction attacks.
- Store uploads outside executable web roots or in object storage.
- Use private-by-default buckets and short-lived signed URLs for authorized downloads.
- Apply malware scanning or content disarm/reconstruction when justified by risk.
- Do not trust client-supplied MIME types.
- Strip metadata from images where privacy requires it.
- Do not serve active content from the same origin as sensitive authenticated pages unless safely designed.
- Restrict image/document processing resources and execution time.
- Ensure file access checks enforce ownership and tenant isolation.

## 16. XSS, CSRF, CORS, and browser security

- Encode untrusted output for the context in which it is rendered.
- Avoid unsafe HTML rendering. If rich HTML is required, sanitize it with a maintained allowlist-based sanitizer.
- Use a carefully tested Content Security Policy (CSP) appropriate to the frontend.
- Use Helmet and review each relevant header instead of assuming defaults fit every application.
- Configure CORS to the exact trusted origins, methods, and headers required.
- Never use wildcard origins with credentialed browser requests.
- Remember that CORS does not prevent non-browser clients from calling APIs.
- If authentication relies on automatically attached cookies, implement CSRF defenses appropriate to the architecture, such as SameSite cookies and CSRF tokens/origin checks.
- Set cookies with appropriate `Secure`, `HttpOnly`, `SameSite`, domain, and path attributes.
- Avoid putting tokens or sensitive data in query strings, where they can leak into logs and referrers.
- Use HTTPS everywhere and avoid mixed content.
- Review `postMessage` origin checks and redirect destinations.
- Validate redirect URLs against an allowlist to prevent open redirects.

## 17. SSRF and outbound network calls

Server-Side Request Forgery (SSRF) can occur when an API fetches a URL chosen by a user.

- Avoid arbitrary user-supplied URL fetching unless the feature requires it.
- Use allowlists of permitted hosts and schemes.
- Block loopback, private, link-local, and cloud metadata IP ranges as appropriate.
- Resolve DNS and validate the resolved destination; account for DNS rebinding and redirects.
- Revalidate each redirect target or disable redirects.
- Apply outbound network restrictions at the infrastructure layer where possible.
- Set timeouts, response-size limits, and content-type constraints.
- Do not forward internal credentials or headers to user-controlled destinations.
- Keep cloud instance metadata access protected using provider-recommended controls.
- Test SSRF defenses without probing systems you do not own or have permission to test.

## 18. Secrets and cryptography

- Use a secret manager or protected runtime injection mechanism.
- Use different secrets for each environment and service.
- Rotate credentials after suspected exposure and on a defined schedule when appropriate.
- Never commit `.env` files, private keys, signing keys, access tokens, or provider secrets.
- Scan repositories, build artifacts, container images, logs, and CI output for secrets.
- Use cryptographically secure random values for session IDs, reset tokens, and idempotency tokens.
- Use standard, maintained cryptographic libraries and modern algorithms.
- Do not implement your own encryption, password hashing, or token scheme.
- Store password hashes, not passwords.
- Use authenticated encryption for application-level encryption where needed and manage keys separately from encrypted data.
- Document key ownership, rotation, recovery, and revocation.
- Do not hardcode secrets into frontend bundles or public source maps.

## 19. Logging, monitoring, and incident response

- Use structured logs with timestamps, severity, request/correlation IDs, and safe context.
- Redact passwords, tokens, session cookies, payment data, and unnecessary personal information.
- Sanitize user-controlled log fields to reduce log injection and line-breaking attacks.
- Restrict log access and protect log integrity.
- Define retention periods and delete logs according to policy.
- Monitor authentication failures, permission denials, rate-limit events, admin changes, payment anomalies, elevated error rates, latency, resource use, and suspicious exports.
- Alert on meaningful thresholds and test that alerts actually reach an owner.
- Keep application, proxy, system, and security events time-synchronized.
- Document incident severity, escalation contacts, containment steps, evidence handling, credential rotation, customer notification requirements, and recovery.
- Prepare for data breach, leaked key, compromised dependency, VPS compromise, and payment-webhook abuse.
- Practice incident response before a real incident.
- Avoid claiming that an event is harmless just because a WAF or antivirus did not flag it.

## 20. API design and business logic

- Use explicit request and response DTOs.
- Return only fields the caller is permitted to see.
- Use consistent error formats and suitable HTTP status codes without leaking internals.
- Set maximum pagination limits and deterministic sorting.
- Use idempotency for operations that may be retried.
- Make state transitions explicit and validate them server-side.
- Use transactions for multi-step changes requiring consistency.
- Separate read and write permissions where useful.
- Prevent mass assignment by mapping allowed fields explicitly.
- Apply authorization to exports, search results, nested resources, and bulk endpoints.
- Use versioning and backward-compatible changes thoughtfully.
- Apply quotas to costly features and tenant-specific workloads.
- Avoid putting sensitive data in URLs.
- Document endpoint ownership, authorization requirements, rate limits, input bounds, and failure behavior.

## 21. Background jobs, queues, and scheduled tasks

- Authenticate and validate producers that can enqueue jobs.
- Do not allow clients to enqueue arbitrary internal job types or payloads.
- Validate job payloads and resource identifiers when jobs execute.
- Apply bounded queue depth, worker concurrency, job size, and execution timeout.
- Use retries with exponential backoff and jitter; avoid infinite retry loops.
- Make jobs idempotent where possible.
- Prevent duplicate processing with unique job keys, database constraints, or a suitable deduplication strategy.
- Treat queued payloads as untrusted and potentially stale.
- Re-check authorization and current business state before sensitive side effects.
- Keep Redis and queue dashboards private and authenticated.
- Set expiration/retention policies for completed and failed jobs.
- Monitor queue age, retries, failures, and dead-letter queues.
- Avoid placing secrets or unnecessary personal data in queue payloads.

## 22. Dependencies, containers, and software supply chain

- Use supported Node.js and package versions.
- Commit and review the package lockfile; use reproducible installs such as `npm ci` in CI.
- Review dependency advisories and prioritize based on exploitability and impact.
- Remove unused packages and unnecessary system utilities.
- Pin base images thoughtfully and rebuild them regularly for security fixes.
- Run containers as non-root where possible.
- Avoid privileged containers and unnecessary Linux capabilities.
- Use read-only filesystems and drop capabilities where compatible.
- Never expose the Docker daemon socket to an application container.
- Do not bake secrets into images or build layers.
- Scan source, dependencies, container images, and infrastructure configuration.
- Protect CI/CD credentials and use short-lived credentials or workload identity where supported.
- Require review for production deployment and infrastructure permission changes.
- Produce and retain useful build provenance/SBOM information when appropriate to your risk profile.

## 23. CI/CD and release management

- Run unit tests, integration tests, linting, type checking, dependency scanning, and security tests in CI.
- Add secret scanning and infrastructure-as-code checks where relevant.
- Use protected branches and required reviews for production changes.
- Separate build permissions from deployment permissions.
- Use least-privilege, short-lived CI credentials where supported.
- Require approval for sensitive production operations.
- Keep staging representative of production without exposing real secrets or unnecessary personal data.
- Run database migrations in a controlled, observable way.
- Use backward-compatible migrations when possible.
- Have a rollback or forward-fix plan and a recovery path for irreversible data changes.
- Use health checks and gradual deployment strategies when supported.
- Verify the deployed artifact and environment configuration.
- Record release versions and deployment actor/time.
- Do not print secrets in CI logs or expose them to untrusted pull-request jobs.

## 24. Testing and security verification

- Unit-test validators, authorization policies, and state transitions.
- Integration-test database permissions, transactions, and unique constraints.
- Test object-level access control using multiple users and tenants.
- Test expired, malformed, revoked, and wrong-audience tokens.
- Test invalid input, oversized payloads, unexpected fields, and malformed JSON.
- Test rate limits across multiple instances and behind the real proxy/CDN setup.
- Test payment webhook signatures, duplicate events, replay, and out-of-order events.
- Test concurrent purchases, refunds, and inventory updates.
- Run dependency and container vulnerability scans.
- Use static analysis and authorized dynamic testing.
- Run load and resilience tests in an approved environment with agreed limits.
- Test backup restoration, failover, rollback, and incident procedures.
- Re-test fixes for vulnerabilities and keep regression tests.
- Never run intrusive security or load tests against third-party systems without explicit authorization.

## 25. Data privacy and compliance

- Collect only data the product genuinely needs.
- Define purposes, access rules, retention periods, and deletion procedures.
- Encrypt sensitive data in transit and at rest where appropriate.
- Mask or pseudonymize production data used for diagnostics or testing.
- Restrict exports and bulk data access; audit sensitive operations.
- Avoid logging full personal records.
- Provide access, correction, deletion, or retention controls when required by applicable law.
- Determine applicable requirements based on customer location, industry, data types, and payment flow. Examples may include privacy laws, PCI DSS, and contractual obligations.
- Do not assume that using a hosted payment provider or cloud platform automatically makes the application compliant.
- Obtain qualified legal or compliance advice for obligations that apply to your business.

## 26. Production readiness checklist

Use this checklist for each production release. Check an item only after it has been implemented and verified.

### Infrastructure
- [ ] Supported, patched operating system and runtime
- [ ] SSH and administrative access restricted
- [ ] Firewall rules reviewed and tested
- [ ] Database/cache/internal services not publicly exposed
- [ ] HTTPS, reverse proxy, request limits, and timeouts configured
- [ ] Origin protected where possible behind the CDN/WAF
- [ ] CPU, memory, disk, network, and process monitoring configured

### Application
- [ ] Configuration validated at startup
- [ ] DTO validation and request-size limits enabled
- [ ] Authentication and session/token lifecycle reviewed
- [ ] Authorization and object ownership tested
- [ ] SQL/NoSQL queries use safe parameterization
- [ ] Rate limits and concurrency caps tested
- [ ] Generic production errors and safe logging implemented
- [ ] Secrets not present in source, images, frontend, or logs

### Data and business logic
- [ ] Database least privilege and integrity constraints configured
- [ ] Sensitive data access is restricted and auditable
- [ ] Payment callbacks are authenticated and idempotent
- [ ] Checkout prices and discounts calculated server-side
- [ ] Concurrency, duplicate operations, and state transitions tested
- [ ] Uploads and object-storage permissions reviewed

### Operations
- [ ] Off-site backups encrypted and access-restricted
- [ ] Restore test completed successfully
- [ ] Alerts route to a responsible person
- [ ] Incident response and credential rotation documented
- [ ] CI includes tests, dependency scanning, and secret scanning
- [ ] Staging validation and rollback/recovery plan completed
- [ ] Security review completed for new endpoints and integrations

## 27. Common dangerous assumptions

- “The frontend validates it” — clients can bypass frontend validation.
- “The route requires login” — a logged-in user may still access another user's records.
- “We use JWT” — JWT does not provide authorization automatically.
- “We use an ORM” — unsafe raw queries and mass assignment can still be vulnerable.
- “We have CORS” — CORS is not an API firewall.
- “We have rate limiting” — IP rotation and network-level DDoS require additional defenses.
- “Our database is password-protected” — it should also be private, least-privileged, patched, monitored, and backed up.
- “Backups are enabled” — a backup that cannot be restored is not a recovery plan.
- “The payment redirect says success” — verify payment with the provider.
- “The WAF blocks attacks” — WAFs do not eliminate application logic flaws.
- “We ran a scanner” — scanners do not prove that authorization and business rules are correct.
- “We deployed successfully” — a successful deployment does not prove security or recoverability.

## 28. Recommended references

Use current official documentation and review it when versions change:

- NestJS security: https://docs.nestjs.com/security
- NestJS validation: https://docs.nestjs.com/techniques/validation
- NestJS rate limiting: https://docs.nestjs.com/security/rate-limiting
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP API Security Top 10: https://owasp.org/www-project-api-security/
- OWASP Application Security Verification Standard (ASVS): https://owasp.org/www-project-application-security-verification-standard/
- Node.js security best practices: https://nodejs.org/en/learn/getting-started/security-best-practices
- Cloudflare documentation: https://developers.cloudflare.com/
- Docker security: https://docs.docker.com/engine/security/

---

## Final rule

**Do not ship a security control just because it exists in the code. Ship it only after you have verified that it works in the actual production architecture, fails safely, is observable, and can be maintained.**
