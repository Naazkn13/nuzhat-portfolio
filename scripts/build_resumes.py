#!/usr/bin/env python3
"""
Resume Generator for Nuzhat Khan using WeasyPrint.
Generates 4 ATS-optimized, single-page, hyperlinked PDF resumes:
1. General Full Stack Developer (Nuzhat_Khan_Resume.pdf) — displayed on portfolio
   (Features 1 project from each domain: Python/Biometric, AI/FashionGallery, Java/QR Attendance)
2. Python Backend Specialist (Nuzhat_Khan_Resume_Python.pdf) — for Python job applications
3. AI / GenAI Specialist (Nuzhat_Khan_Resume_AI_ML.pdf) — for AI/ML job applications
4. Java Full Stack Specialist (Nuzhat_Khan_Resume_Java.pdf) — for Java job applications
"""

import os
import sys
from pathlib import Path
from weasyprint import HTML
import pydyf

PUBLIC_DIR = Path("/home/nuzhat/github-repos/nuzhat-portfolio/public")
PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

CSS_TEMPLATE = """
@page {
    size: A4;
    margin: 7mm 11mm 7mm 11mm;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Carlito', 'Calibri', 'Helvetica Neue', Arial, sans-serif;
    color: #1a1a1a;
    font-size: 8.5pt;
    line-height: 1.28;
    background-color: #ffffff;
}

header {
    text-align: center;
    margin-bottom: 6px;
    border-bottom: 1.5px solid #111827;
    padding-bottom: 4px;
}

h1 {
    font-size: 18.5pt;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #0f172a;
    text-transform: uppercase;
    margin-bottom: 2px;
}

.headline {
    font-size: 8.8pt;
    font-weight: 600;
    color: #0d9488;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 2.5px;
}

.contact-line {
    font-size: 8.2pt;
    color: #475569;
}

.contact-line a {
    color: #0284c7;
    text-decoration: none;
}

.contact-line a:hover {
    text-decoration: underline;
}

.contact-line .sep {
    margin: 0 4px;
    color: #94a3b8;
}

section {
    margin-bottom: 5px;
}

h2 {
    font-size: 9.3pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #0f172a;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 1.5px;
    margin-bottom: 3px;
}

.summary-text {
    font-size: 8.4pt;
    color: #334155;
    text-align: justify;
    line-height: 1.28;
}

.skills-container {
    font-size: 8.3pt;
    line-height: 1.3;
    color: #334155;
}

.skills-row {
    margin-bottom: 1.2px;
}

.skills-label {
    font-weight: 700;
    color: #0f172a;
}

.job-header, .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1px;
}

.job-title, .project-title {
    font-size: 9pt;
    font-weight: 700;
    color: #0f172a;
}

.job-company {
    font-weight: 600;
    color: #1e293b;
}

.job-date, .project-tag {
    font-size: 8pt;
    font-weight: 600;
    color: #64748b;
}

.sub-project-title {
    font-size: 8.5pt;
    font-weight: 700;
    color: #0f766e;
    margin-top: 1.5px;
    margin-bottom: 1px;
}

ul {
    list-style-type: disc;
    margin-left: 13px;
    margin-bottom: 1.5px;
}

li {
    margin-bottom: 1px;
    font-size: 8.3pt;
    color: #334155;
    line-height: 1.25;
    text-align: justify;
}

li strong {
    color: #0f172a;
}

.edu-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.4pt;
    color: #334155;
}

.edu-institution {
    font-weight: 700;
    color: #0f172a;
}

.edu-year {
    font-weight: 600;
    color: #64748b;
}

.cert-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.3pt;
    color: #334155;
}

.cert-title {
    font-weight: 700;
    color: #0f172a;
}

.cert-meta {
    color: #64748b;
    font-size: 8pt;
}

a.inline-link {
    color: #0284c7;
    text-decoration: none;
    font-weight: 600;
}
a.inline-link:hover {
    text-decoration: underline;
}
"""

def generate_header(headline: str) -> str:
    return f"""
    <header>
        <h1>Nuzhat Khan</h1>
        <div class="headline">{headline}</div>
        <div class="contact-line">
            <span>Mumbai, India</span>
            <span class="sep">|</span>
            <a href="tel:+919769149366">+91-9769149366</a>
            <span class="sep">|</span>
            <a href="mailto:knuzhat136@gmail.com">knuzhat136@gmail.com</a>
            <span class="sep">|</span>
            <a href="https://linkedin.com/in/nuzhat-khan-dev">linkedin.com/in/nuzhat-khan-dev</a>
            <span class="sep">|</span>
            <a href="https://github.com/Naazkn13">github.com/Naazkn13</a>
            <span class="sep">|</span>
            <a href="https://nuzhat-portfolio-alpha.vercel.app">portfolio</a>
        </div>
    </header>
    """

# =============================================================================
# 1. GENERAL FULL-STACK DEVELOPER RESUME (Displayed on Portfolio)
#    Features 1 project from each domain: Python, AI/ML, and Java
# =============================================================================
HTML_GENERAL = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Nuzhat Khan — Software Developer Resume</title>
    <style>{CSS_TEMPLATE}</style>
</head>
<body>
    {generate_header("Software Developer | Python · React · Java · AI/GenAI · PostgreSQL · Docker")}

    <section>
        <h2>Professional Summary</h2>
        <p class="summary-text">
            Software Developer with 14 months of enterprise product engineering experience delivering 4 production RegTech platforms. Proven ability building end-to-end applications across Python, React, Java, and modern Generative AI (RAG, vector retrieval). Experienced from relational schema design (PostgreSQL) and RESTful API architecture to mobile distribution (Expo), containerization (Docker), and Azure DevOps CI/CD deployment.
        </p>
    </section>

    <section>
        <h2>Technical Skills</h2>
        <div class="skills-container">
            <div class="skills-row"><span class="skills-label">Languages:</span> Python, Java (17/21), TypeScript, JavaScript, SQL</div>
            <div class="skills-row"><span class="skills-label">Frontend & Mobile:</span> React, Next.js, Tailwind CSS, Framer Motion, Expo (React Native), HTML5/CSS3</div>
            <div class="skills-row"><span class="skills-label">Backend & APIs:</span> FastAPI, REST APIs, Node.js, Spring Boot, Pydantic, SQLAlchemy, PyTest, Microservices</div>
            <div class="skills-row"><span class="skills-label">AI & Data Engineering:</span> RAG, Vector Search, Qdrant, Pinecone, CLIP Embeddings, Pandas, PyMuPDF, Tabula-py</div>
            <div class="skills-row"><span class="skills-label">Databases & DevOps:</span> PostgreSQL, MySQL, Supabase, Redis, Docker, Azure DevOps, Git, GitHub Actions, Linux</div>
        </div>
    </section>

    <section>
        <h2>Professional Experience</h2>
        <div class="job-header">
            <div><span class="job-company">Infomatics Services Pvt. Ltd.</span> &mdash; <span class="job-title">Software Developer</span></div>
            <div class="job-date">Mumbai | June 2025 – 24 July 2026</div>
        </div>
        <ul>
            <li><strong>Novus Comply & Novus UPSI:</strong> Engineered multi-tier trade pre-clearance engine automating reconciliation across 4 financial data feeds (ECAS/BENPOS/KFin/CAMS) and flagging 100% of restricted insider trades; implemented granular RBAC and audit logging for SEBI PIT compliance.</li>
            <li><strong>Compulse Compliance Platform:</strong> Co-developed enterprise platform automating 67+ SEBI reporting types across 43 maker-checker workflow stages and 32+ automated email notifications; successfully transitioned into institutional client UAT.</li>
            <li><strong>CAS Statement Parser:</strong> Developed automated desktop application (Python, Tauri, PyInstaller) extracting Demat holdings and mutual funds from unstructured CDSL statements at 98% accuracy (500+ statements/month), saving 10+ hours/week.</li>
            <li><strong>Employee Operations Portal:</strong> Built operational management platform for 50+ employees with real-time balance dashboards and configurable approval workflows, cutting HR processing overhead by 60%.</li>
        </ul>
    </section>

    <section>
        <h2>Featured Projects (Python · AI/ML · Java)</h2>
        
        <!-- 1. PYTHON / HARDWARE -->
        <div class="project-header">
            <div>
                <span class="project-title">Biometric Attendance & Payroll Engine</span> &mdash; 
                <a class="inline-link" href="https://attendance-sigma-one.vercel.app">attendance-sigma-one.vercel.app</a>
            </div>
            <div class="project-tag">FastAPI · React · Supabase · Expo · ZKTeco SDK</div>
        </div>
        <ul>
            <li>Deployed hardware-integrated biometric tracking system for 8+ eye hospital staff with real-time ZKTeco SDK sync, automating 30-day payroll cycles, overtime, leave accruals, and PDF payslips; reduced monthly processing time from 2+ hours to under 30 minutes.</li>
        </ul>

        <!-- 2. AI / ML -->
        <div class="project-header" style="margin-top: 2px;">
            <div>
                <span class="project-title">FashionGallery — Multimodal Semantic Search</span> &mdash; 
                <a class="inline-link" href="https://github.com/Naazkn13/FashionGallery">github.com/Naazkn13/FashionGallery</a>
            </div>
            <div class="project-tag">Python · FastAPI · CLIP · Qdrant · RAG · Docker</div>
        </div>
        <ul>
            <li>Built an AI visual/textual discovery engine utilizing OpenAI CLIP embeddings to generate joint image-text similarity vectors indexed in Qdrant vector database; added explainable RAG layer to communicate match confidence scores via asynchronous FastAPI endpoints.</li>
        </ul>

        <!-- 3. JAVA -->
        <div class="project-header" style="margin-top: 2px;">
            <div>
                <span class="project-title">Java QR Attendance & Management Platform</span> &mdash; 
                <a class="inline-link" href="https://github.com/Naazkn13/java-qr-attendance-system">github.com/Naazkn13/java-qr-attendance-system</a>
            </div>
            <div class="project-tag">Java · Swing · MySQL · JDBC · QR Processing</div>
        </div>
        <ul>
            <li>Engineered an attendance tracking desktop application using Java Swing and MySQL with JDBC connection pooling, generating dynamic QR tokens for touchless identity verification and exportable attendance reports.</li>
        </ul>
    </section>

    <section>
        <h2>Education</h2>
        <div class="edu-row">
            <div><span class="edu-institution">BSc in Information Technology</span> &mdash; Bhavan's College, Mumbai University</div>
            <div class="edu-year">2021 – 2024</div>
        </div>
    </section>

    <section>
        <h2>Certifications</h2>
        <div class="cert-row">
            <div><span class="cert-title">Advanced Program in Java Full Stack Development</span> &mdash; DVOC Institute (Skill India / NSDC)</div>
            <div class="cert-meta">Dec 2025 | ID: CERT_3243029_5</div>
        </div>
    </section>
</body>
</html>
"""

# =============================================================================
# 2. PYTHON BACKEND & REGTECH SPECIALIST RESUME (For Python Job Applications)
# =============================================================================
HTML_PYTHON = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Nuzhat Khan — Python Backend Developer Resume</title>
    <style>{CSS_TEMPLATE}</style>
</head>
<body>
    {generate_header("Software Developer | Python · FastAPI · PostgreSQL · Docker · RegTech & BFSI Systems")}

    <section>
        <h2>Professional Summary</h2>
        <p class="summary-text">
            Backend-focused Software Developer with 14 months of enterprise product engineering experience shipping 4 production RegTech platforms. Proven track record architecting automated SEBI compliance reporting, insider trading (PIT/UPSI) governance, and financial document extraction pipelines. Core stack: Python, FastAPI, PostgreSQL, REST APIs, and Docker, with end-to-end delivery from database architecture to Azure DevOps CI/CD deployment.
        </p>
    </section>

    <section>
        <h2>Technical Skills</h2>
        <div class="skills-container">
            <div class="skills-row"><span class="skills-label">Languages:</span> Python, SQL, TypeScript, JavaScript, Java</div>
            <div class="skills-row"><span class="skills-label">Backend & APIs:</span> FastAPI, REST APIs, Pydantic, SQLAlchemy, PyTest, Microservices, AsyncIO, Node.js</div>
            <div class="skills-row"><span class="skills-label">Databases & Storage:</span> PostgreSQL, Supabase, Redis (Caching), Database Indexing, Schema Design</div>
            <div class="skills-row"><span class="skills-label">DevOps & Cloud:</span> Docker, Azure DevOps, Git, GitHub Actions, Linux (Ubuntu), CI/CD Pipelines, Postman</div>
            <div class="skills-row"><span class="skills-label">Document & Data:</span> PyMuPDF, Tabula-py, Pandas, Unstructured Data Parsing, RegTech Pipelines</div>
            <div class="skills-row"><span class="skills-label">Domain & Architecture:</span> SEBI Regulatory Reporting, Maker-Checker Workflows, RBAC, Audit Logging, PIT/UPSI</div>
        </div>
    </section>

    <section>
        <h2>Professional Experience</h2>
        <div class="job-header">
            <div><span class="job-company">Infomatics Services Pvt. Ltd.</span> &mdash; <span class="job-title">Software Developer</span></div>
            <div class="job-date">Mumbai | June 2025 – 24 July 2026</div>
        </div>

        <div class="sub-project-title">Novus Comply & Novus UPSI (Enterprise RegTech & Trade Surveillance)</div>
        <ul>
            <li><strong>Automated Pre-Clearance Engine:</strong> Engineered multi-tier trade surveillance workflows reconciling 4 enterprise datasets (ECAS, BENPOS, KFin, CAMS) in real-time, eliminating manual cross-checking and flagging 100% of restricted insider trades.</li>
            <li><strong>Access Governance & Compliance:</strong> Implemented granular Role-Based Access Control (RBAC) and bcrypt authentication across all user tiers, enforcing SEBI PIT grey-list restrictions with tamper-evident audit logs.</li>
            <li><strong>Performance Optimization:</strong> Designed asynchronous FastAPI endpoints backed by indexed PostgreSQL queries, ensuring sub-second response times across compliance audit queues.</li>
        </ul>

        <div class="sub-project-title">Compulse (Regulatory Reporting Platform)</div>
        <ul>
            <li><strong>Reporting Automation:</strong> Co-developed enterprise platform automating 67+ SEBI reporting types across 43 maker-checker workflow stages and 32+ automated email triggers; successfully deployed into UAT for a leading financial institution.</li>
            <li><strong>Validation Layers:</strong> Built standardized Pydantic data validation schemas across heterogeneous data sources, eliminating cross-departmental submission errors.</li>
        </ul>

        <div class="sub-project-title">CAS Parser (Financial Document Extraction Desktop Pipeline)</div>
        <ul>
            <li><strong>Unstructured PDF Extraction:</strong> Built an automated Python desktop application (Tauri + PyInstaller) parsing Demat holdings, transactions, and mutual funds from unstructured CDSL statements using PyMuPDF and Pandas.</li>
            <li><strong>Accuracy & Efficiency:</strong> Processed 500+ CDSL statements/month with 98% extraction accuracy, eliminating 10+ hours/week of manual compliance data entry for operations teams.</li>
        </ul>

        <div class="sub-project-title">Employee Operations & Leave Management System</div>
        <ul>
            <li>Delivered full-stack operational system supporting 50+ active employees with real-time balance dashboards, configurable approval rules, and automated escalation logic, reducing administrative processing time by 60%.</li>
        </ul>
    </section>

    <section>
        <h2>Key Independent Projects</h2>
        <div class="project-header">
            <div>
                <span class="project-title">Biometric Attendance & Salary Engine</span> &mdash; 
                <a class="inline-link" href="https://attendance-sigma-one.vercel.app">attendance-sigma-one.vercel.app</a>
            </div>
            <div class="project-tag">FastAPI · React · Supabase · Expo · ZKTeco SDK</div>
        </div>
        <ul>
            <li><strong>Hardware Integration & Automation:</strong> Deployed end-to-end attendance system for 8+ eye hospital staff with real-time ZKTeco biometric synchronization, replacing manual Excel logging and reducing monthly payroll computation time from 2+ hours to under 30 minutes.</li>
            <li><strong>Payroll & Mobile App:</strong> Built payroll engine handling 30-day pay cycles, paid leave accrual, overtime, deductions, and automatic payslips; distributed cross-platform mobile check-in via Expo Android APK.</li>
        </ul>

        <div class="project-header" style="margin-top: 2.5px;">
            <div>
                <span class="project-title">NSA Sports Platform</span> &mdash; 
                <a class="inline-link" href="https://nsasports.co.in">nsasports.co.in</a>
            </div>
            <div class="project-tag">Production Live · Next.js · Node.js · MongoDB · RBAC</div>
        </div>
        <ul>
            <li><strong>Player & Club Management:</strong> Architected a live sports operations platform managing 50+ active players with multi-tier registration, club affiliations, and automated document verification workflows.</li>
            <li><strong>Workflow Automation:</strong> Built role-aware administrative dashboards with automated approval/rejection decision triggers and instant notification emails, cutting manual review turnaround time by 70%.</li>
        </ul>
    </section>

    <section>
        <h2>Education</h2>
        <div class="edu-row">
            <div><span class="edu-institution">BSc in Information Technology</span> &mdash; Bhavan's College, Mumbai University</div>
            <div class="edu-year">2021 – 2024</div>
        </div>
    </section>

    <section>
        <h2>Certifications</h2>
        <div class="cert-row">
            <div><span class="cert-title">Advanced Program in Java Full Stack Development</span> &mdash; DVOC Institute (Skill India / NSDC)</div>
            <div class="cert-meta">Dec 2025 | ID: CERT_3243029_5</div>
        </div>
    </section>
</body>
</html>
"""

# =============================================================================
# 3. AI / GENAI & APPLICATION DEVELOPER RESUME (For AI/ML Job Applications)
# =============================================================================
HTML_AI = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Nuzhat Khan — AI / GenAI Developer Resume</title>
    <style>{CSS_TEMPLATE}</style>
</head>
<body>
    {generate_header("Software Developer | Python · AI/GenAI · RAG · Vector Search · LLM Applications · FastAPI")}

    <section>
        <h2>Professional Summary</h2>
        <p class="summary-text">
            Software Developer specializing in Python, Generative AI applications, and RAG architectures. Experienced combining robust backend systems (FastAPI, PostgreSQL, Docker) with practical LLM workflows, vector databases (Qdrant, Pinecone), and multimodal embeddings (CLIP). Proven track record engineering complex document processing pipelines and rule-based enterprise software (Infomatics Services), bringing real-world data reliability into modern AI systems.
        </p>
    </section>

    <section>
        <h2>Technical Skills</h2>
        <div class="skills-container">
            <div class="skills-row"><span class="skills-label">AI & GenAI:</span> RAG (Retrieval-Augmented Generation), Semantic Search, Embeddings, Vector Retrieval, LLM Integration, Prompt Engineering, LangChain</div>
            <div class="skills-row"><span class="skills-label">Vector Databases:</span> Qdrant, Pinecone, FAISS, Similarity Search, Hybrid Search</div>
            <div class="skills-row"><span class="skills-label">Languages & Backend:</span> Python, TypeScript, JavaScript, SQL, FastAPI, REST APIs, Pydantic, Microservices</div>
            <div class="skills-row"><span class="skills-label">Data Engineering:</span> PyMuPDF, Tabula-py, Pandas, Unstructured Document Extraction, OCR & Parsing Pipelines</div>
            <div class="skills-row"><span class="skills-label">Databases & DevOps:</span> PostgreSQL, Supabase, MongoDB, Docker, Git, GitHub Actions, Linux, CI/CD, Postman</div>
            <div class="skills-row"><span class="skills-label">Frontend & Deployment:</span> React, Next.js, Tailwind CSS, Vercel, Railway, Azure DevOps</div>
        </div>
    </section>

    <section>
        <h2>AI & Engineering Projects</h2>
        
        <div class="project-header">
            <div>
                <span class="project-title">FashionGallery — Multimodal Semantic Search & Discovery Engine</span> &mdash; 
                <a class="inline-link" href="https://github.com/Naazkn13/FashionGallery">GitHub</a>
            </div>
            <div class="project-tag">Python · FastAPI · CLIP · Qdrant · RAG · Next.js · Docker</div>
        </div>
        <ul>
            <li><strong>Multimodal Vector Retrieval:</strong> Developed an AI-powered visual and textual discovery engine using OpenAI CLIP embeddings to compute joint image-text similarity vectors stored in Qdrant vector database.</li>
            <li><strong>Explainable RAG Layer:</strong> Implemented RAG-style query expansion to retrieve relevant product metadata and explain why visual recommendations match user intent, overcoming traditional text-only search limits.</li>
            <li><strong>Production Architecture:</strong> Designed asynchronous FastAPI endpoints serving similarity queries with Dockerized deployment for dev/prod parity.</li>
        </ul>

        <div class="project-header" style="margin-top: 3px;">
            <div>
                <span class="project-title">CAS Parser — Unstructured Financial Document AI Extraction Pipeline</span> &mdash; 
                <span class="job-company">Client Deployed</span>
            </div>
            <div class="project-tag">Python · PyMuPDF · Tabula-py · Pandas · Tauri</div>
        </div>
        <ul>
            <li><strong>Document Parsing at Scale:</strong> Engineered an intelligent document pipeline converting semi-structured and unstructured CDSL statement PDFs into normalized tabular records with 98% extraction accuracy across 500+ statements/month.</li>
            <li><strong>High-ROI Automation:</strong> Eliminated 10+ hours/week of manual document entry for financial operations teams by implementing deterministic layout extraction algorithms.</li>
        </ul>

        <div class="project-header" style="margin-top: 3px;">
            <div>
                <span class="project-title">Biometric Attendance & Salary Engine</span> &mdash; 
                <a class="inline-link" href="https://attendance-sigma-one.vercel.app">attendance-sigma-one.vercel.app</a>
            </div>
            <div class="project-tag">FastAPI · React · Supabase · Expo · ZKTeco SDK</div>
        </div>
        <ul>
            <li>Deployed production full-stack platform managing real-time biometric event synchronization, configurable rule evaluation, and automatic payslip generation for healthcare staff, reducing payroll cycle duration by 75%.</li>
        </ul>
    </section>

    <section>
        <h2>Professional Experience</h2>
        <div class="job-header">
            <div><span class="job-company">Infomatics Services Pvt. Ltd.</span> &mdash; <span class="job-title">Software Developer</span></div>
            <div class="job-date">Mumbai | June 2025 – 24 July 2026</div>
        </div>
        <ul>
            <li><strong>Enterprise RegTech Platforms:</strong> Shipped 4 production financial compliance platforms automating 67+ SEBI reporting templates and real-time trade pre-clearance across 4 financial data feeds (ECAS/BENPOS/KFin/CAMS).</li>
            <li><strong>Data & Workflow Governance:</strong> Implemented 43 maker-checker stages, automated email event triggers, and tamper-resistant audit logs using FastAPI, PostgreSQL, and RBAC security models.</li>
            <li><strong>Engineering Standards:</strong> Integrated Docker containerization and Azure DevOps CI/CD pipelines, ensuring production release reliability across institutional UAT deployments.</li>
        </ul>
    </section>

    <section>
        <h2>Education</h2>
        <div class="edu-row">
            <div><span class="edu-institution">BSc in Information Technology</span> &mdash; Bhavan's College, Mumbai University</div>
            <div class="edu-year">2021 – 2024</div>
        </div>
    </section>

    <section>
        <h2>Certifications</h2>
        <div class="cert-row">
            <div><span class="cert-title">Advanced Program in Java Full Stack Development</span> &mdash; DVOC Institute (Skill India / NSDC)</div>
            <div class="cert-meta">Dec 2025 | ID: CERT_3243029_5</div>
        </div>
    </section>
</body>
</html>
"""

# =============================================================================
# 4. JAVA FULLSTACK & SPRING BOOT SPECIALIST RESUME (For Java Job Applications)
# =============================================================================
HTML_JAVA = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Nuzhat Khan — Java Full Stack Developer Resume</title>
    <style>{CSS_TEMPLATE}</style>
</head>
<body>
    {generate_header("Software Developer | Java · Spring Boot · Microservices · PostgreSQL · REST APIs · Docker")}

    <section>
        <h2>Professional Summary</h2>
        <p class="summary-text">
            Software Developer with certified Java Full Stack training (DVOC Institute / Skill India) and 14 months of enterprise software engineering experience building regulated compliance workflows and high-reliability data platforms. Experienced across Java, Spring Boot, RESTful APIs, PostgreSQL, Docker, and React. Proven background implementing multi-tier maker-checker approvals, Role-Based Access Control (RBAC), and transactional integrity in enterprise BFSI environments.
        </p>
    </section>

    <section>
        <h2>Technical Skills</h2>
        <div class="skills-container">
            <div class="skills-row"><span class="skills-label">Languages:</span> Java (17/21), SQL, Python, TypeScript, JavaScript</div>
            <div class="skills-row"><span class="skills-label">Java Frameworks:</span> Spring Boot 3, Spring Data JPA, Hibernate, Spring Security, RESTful Web Services, JUnit 5, Mockito</div>
            <div class="skills-row"><span class="skills-label">Databases & Storage:</span> PostgreSQL, MySQL, Supabase, Redis (Caching), Database Indexing, Transaction Management</div>
            <div class="skills-row"><span class="skills-label">Architecture:</span> Microservices, REST APIs, Maker-Checker Workflows, RBAC, Design Patterns (Factory, Strategy, Builder)</div>
            <div class="skills-row"><span class="skills-label">DevOps & Build:</span> Maven, Docker, Git, GitHub Actions, CI/CD Pipelines, Linux (Ubuntu), Azure DevOps, Postman</div>
            <div class="skills-row"><span class="skills-label">Frontend:</span> React, Next.js, HTML5, CSS3, Tailwind CSS</div>
        </div>
    </section>

    <section>
        <h2>Professional Experience</h2>
        <div class="job-header">
            <div><span class="job-company">Infomatics Services Pvt. Ltd.</span> &mdash; <span class="job-title">Software Developer</span></div>
            <div class="job-date">Mumbai | June 2025 – 24 July 2026</div>
        </div>

        <div class="sub-project-title">Enterprise RegTech Platforms (Novus Comply & Compulse)</div>
        <ul>
            <li><strong>Workflow & Maker-Checker Systems:</strong> Co-engineered enterprise compliance platform automating 67+ regulatory reporting templates across 43 maker-checker approval workflows and 32+ automated email notification triggers.</li>
            <li><strong>Access Control & Security:</strong> Implemented comprehensive Role-Based Access Control (RBAC) and bcrypt password hashing across administrative and user tiers, maintaining strict audit trails for SEBI regulatory compliance.</li>
            <li><strong>Data Integrity & Reconciliation:</strong> Architected reconciliation services cross-referencing trade orders against 4 financial data feeds (ECAS/BENPOS/CAMS), flagging 100% of non-compliant insider trades.</li>
            <li><strong>CI/CD & Deployment:</strong> Collaborated on Dockerized build configurations and Azure DevOps pipelines, achieving continuous integration parity across development and UAT environments.</li>
        </ul>

        <div class="sub-project-title">Enterprise Data Extraction & Operations Systems</div>
        <ul>
            <li>Built high-accuracy document extraction tools and company-wide operational dashboards handling 50+ employees with configurable escalation rules, cutting manual processing overhead by 60%.</li>
        </ul>
    </section>

    <section>
        <h2>Technical Projects</h2>
        <div class="project-header">
            <div>
                <span class="project-title">TradeSentry — RegTech Pre-Clearance & Audit Microservice</span> &mdash; 
                <span class="job-company">Spring Boot 3 Architecture</span>
            </div>
            <div class="project-tag">Java 21 · Spring Boot 3 · Spring Data JPA · PostgreSQL · Docker · JUnit 5</div>
        </div>
        <ul>
            <li><strong>Enterprise Architecture:</strong> Designed a modular Spring Boot microservice simulating trade pre-clearance validation with Spring Security JWT authentication and role-based clearance permissions (`ROLE_TRADER`, `ROLE_COMPLIANCE`).</li>
            <li><strong>Data & Caching Layer:</strong> Leveraged Spring Data JPA and Hibernate for relational persistence on PostgreSQL, integrating Redis caching for fast-path restricted ticker queries to reduce database read load by 85%.</li>
            <li><strong>Testing & Rigor:</strong> Wrote automated controller and service unit tests using JUnit 5 and Mockito, ensuring test coverage over approval state machine transitions.</li>
        </ul>

        <div class="project-header" style="margin-top: 3px;">
            <div>
                <span class="project-title">Biometric Attendance & Salary Engine</span> &mdash; 
                <a class="inline-link" href="https://attendance-sigma-one.vercel.app">attendance-sigma-one.vercel.app</a>
            </div>
            <div class="project-tag">Full Stack · React · REST APIs · PostgreSQL/Supabase · Hardware SDK</div>
        </div>
        <ul>
            <li>Architected and deployed full-stack attendance tracking system with hardware integration, complex 30-day payroll calculations, and automatic payslip generation, reducing monthly HR calculation time from 2+ hours to under 30 minutes.</li>
        </ul>

        <div class="project-header" style="margin-top: 3px;">
            <div>
                <span class="project-title">Java QR Attendance & Management Platform</span> &mdash; 
                <a class="inline-link" href="https://github.com/Naazkn13/java-qr-attendance-system">GitHub</a>
            </div>
            <div class="project-tag">Java · Swing · MySQL · JDBC · QR Processing</div>
        </div>
        <ul>
            <li>Engineered a desktop attendance management platform utilizing Java Swing and MySQL with JDBC connection pooling, generating dynamic QR tokens for touchless identity verification.</li>
        </ul>
    </section>

    <section>
        <h2>Education</h2>
        <div class="edu-row">
            <div><span class="edu-institution">BSc in Information Technology</span> &mdash; Bhavan's College, Mumbai University</div>
            <div class="edu-year">2021 – 2024</div>
        </div>
    </section>

    <section>
        <h2>Certifications</h2>
        <div class="cert-row">
            <div><span class="cert-title">Advanced Program in Java Full Stack Development</span> &mdash; DVOC Institute (Skill India / NSDC)</div>
            <div class="cert-meta">Dec 2025 | ID: CERT_3243029_5</div>
        </div>
    </section>
</body>
</html>
"""

def compile_resumes():
    resumes = [
        ("Nuzhat_Khan_Resume.pdf", HTML_GENERAL, "1. General Full Stack (Displayed on Portfolio)"),
        ("Nuzhat_Khan_Resume_Python.pdf", HTML_PYTHON, "2. Python Backend Specialist"),
        ("Nuzhat_Khan_Resume_AI_ML.pdf", HTML_AI, "3. AI / GenAI Specialist"),
        ("Nuzhat_Khan_Resume_Java.pdf", HTML_JAVA, "4. Java Full Stack Specialist"),
    ]

    print("=" * 65)
    print("COMPILING 4 ATS-OPTIMIZED RESUMES WITH WEASYPRINT")
    print("=" * 65)

    all_passed = True
    for filename, html_content, label in resumes:
        out_path = PUBLIC_DIR / filename
        html = HTML(string=html_content)
        doc = html.render()
        page_count = len(doc.pages)
        doc.write_pdf(target=str(out_path))
        file_size = os.path.getsize(out_path)
        
        status = "✓ 1 PAGE (PERFECT)" if page_count == 1 else f"⚠ {page_count} PAGES (OVERFLOW)"
        if page_count != 1:
            all_passed = False
        print(f"[{label}] -> {filename}")
        print(f"    Pages: {page_count} {status} | Size: {file_size:,} bytes")
        print(f"    Saved to: {out_path}")
        print("-" * 65)

    if all_passed:
        print("\nALL 4 RESUMES COMPILED ON EXACTLY 1 PAGE EACH!")

if __name__ == "__main__":
    compile_resumes()
