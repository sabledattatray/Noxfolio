# Security Policy: Noxfolio

Noxfolio is a mission-critical financial infrastructure platform. We take security seriously and invite the global research community to audit our logic.

## 🛡️ Security Posture
- **Data Isolation**: Multi-tenant RBAC with strict workspace separation.
- **Observability**: Immutable activity ledger for all high-privilege events.
- **Infrastructure**: Secure database connection pooling and rate-limited APIs.
- **Authentication**: JWT-based session management with token rotation.

## 🕵️ Reporting a Vulnerability
If you discover a security vulnerability within Noxfolio, please send an e-mail to **security@noxfolio.com**. All security vulnerabilities will be promptly addressed.

Please include:
1.  **Description**: A detailed description of the vulnerability.
2.  **Reproduction**: Steps to reproduce the issue.
3.  **Impact**: What is the potential impact on user data or system integrity?

## 🎁 Bug Bounty
We are an open-core project. While we do not have a formal monetary bug bounty program yet, we provide:
- **Hall of Fame**: Public recognition in our `CONTRIBUTORS.md`.
- **Free Enterprise Access**: Complimentary access to Noxfolio Enterprise for 1 year.
- **Priority Consideration**: For engineering roles within the Noxfolio ecosystem.

## 🚫 Out of Bounds
- Social engineering (e.g. phishing, vishing, smishing).
- Denial of Service (DoS) attacks.
- Physical attacks against our infrastructure.

---

Thank you for helping us keep Noxfolio secure.
