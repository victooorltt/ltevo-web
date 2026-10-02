import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = fs.readFileSync(path.resolve('app/api/contact/route.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;

function handler({ apiKey = 'test-key', providerError = null } = {}) {
  const emails = [];
  class Resend {
    emails = { send: async (message) => { emails.push(message); return { error: providerError }; } };
  }
  const compiledModule = { exports: {} };
  const imports = (name) => name === 'resend' ? { Resend } : require(name);
  const environment = { env: { RESEND_API_KEY: apiKey, SENDER_EMAIL: 'sender@example.test', RECIPIENT_EMAIL: 'owner@example.test' } };
  new Function('require', 'exports', 'module', 'process', 'console', compiled)(imports, compiledModule.exports, compiledModule, environment, { error() {} });
  return { post: compiledModule.exports.POST, emails };
}
const payload = { name: 'Persona de prueba', email: 'visitor@example.test', message: '<script>payload</script>', service: 'mantenimiento', plan: 'Profesional', sourcePath: '/servicios/mantenimiento-web', landingPath: '/blog/que-incluye-mantenimiento-web', consent: true, website: '' };
const request = (body) => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

test('accepted enquiry sends selected service, plan and safe page context to the provider', async () => {
  const { post, emails } = handler();
  const response = await post(request(payload));
  assert.equal(response.status, 200); assert.deepEqual(await response.json(), { success: true });
  assert.equal(emails.length, 1);
  assert.match(emails[0].subject, /Mantenimiento Web · Profesional/);
  assert.match(emails[0].html, /\/servicios\/mantenimiento-web/);
  assert.match(emails[0].html, /\/blog\/que-incluye-mantenimiento-web/);
  assert.match(emails[0].html, /&lt;script&gt;payload&lt;\/script&gt;/);
  assert.equal(emails[0].replyTo, payload.email);
});

test('invalid consent, plan and page context never reach the email provider', async () => {
  for (const change of [{ consent: false }, { plan: 'Inventado' }, { sourcePath: 'javascript:alert(1)' }, { landingPath: '/?email=private@example.test' }]) {
    const { post, emails } = handler();
    assert.equal((await post(request({ ...payload, ...change }))).status, 400);
    assert.equal(emails.length, 0);
  }
});

test('provider or configuration failure cannot be reported as a successful enquiry', async () => {
  const failed = handler({ providerError: { message: 'provider-secret-detail' } });
  const response = await failed.post(request(payload));
  assert.equal(response.status, 500); assert.equal((await response.json()).success, undefined);
  const unconfigured = handler({ apiKey: '' });
  assert.equal((await unconfigured.post(request(payload))).status, 500);
  assert.equal(unconfigured.emails.length, 0);
});
