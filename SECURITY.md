# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public issue
2. Email the maintainers or use GitHub's [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
3. Include steps to reproduce the vulnerability
4. Allow reasonable time for a fix before public disclosure

## Scope

This is a UI component library with no server-side code. Security concerns are primarily around:

- XSS through unsanitized props
- Dependency vulnerabilities
- Unsafe HTML injection patterns

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest  | Yes       |
