window.FA3_INITIAL_DATA = {
  "version": 1,
  "months": [
    "2026-11"
  ],
  "updates": {
    "AI Testing Management": {
      "2026-11": "Development on going on track with backend\nAPI all completed and frontend application building started."
    },
    "AI Agent for Automated Troubleshooting (SRE Agent)": {
      "2026-11": "Current Progress\n\n1. Completed requirements clarification and alignment for 5 product objectives and 7 user stories.\n2. Vendor solution presentations are underway, with some vendors having completed their sessions.\n3. The technical team has completed the in-house POC and proposed technical design.\n\nNext Steps\n\n1. Organize a stakeholder review to assess and align on the in-house solution.\n2. Conduct a build-versus-buy assessment once all vendor presentations are complete.\n3. Target T1 to finalize the solution decision and confirm the technical architecture.\n\nOverall Roadmap\n\nFY27 T1 — Solution Selection and Risk Reduction\nComplete solution selection and address key risks. Deliver an agreed technical architecture, governance model, scope and budget, clear responsibilities across internal teams and vendors, and an actionable delivery plan.\n\nFY27 T2 — Build and Validation\nDeliver operational Incident Intelligence foundational capabilities, validated through real-world data and user pilots against agreed quality, security, and user-experience acceptance criteria.\n\nFY27 T3 — Closed-Loop Improvement and Scaling\nDeliver mechanisms for generating and validating security recommendations, establish a continuous learning and feedback loop, execute a controlled production rollout, and complete the final KPI assessment.\n"
    },
    "Data Backup & Disaster Recovery (CDH)": {
      "2026-11": "1.Aligned the FY27 scope and goals, and scheduled meetings with relevant teams to collect new  data sources.\n2. Technically support unified S3-like service as the backup storage - in progress. It should support not only AliCloud and HW Cloud, but also any major object storage type, to meet cloud-native needs.\n3. Existing backup coverage reviewed: Backups established through FY26 and maintained to date have been revisited. The review identifies current data owners, continued business relevance, changed or retired systems, and potential coverage gaps."
    },
    "Secret Key & Credential Governance": {
      "2026-11": "Short-term: The credential inventory is largely complete and undergoing verification.\nLong-term: The RRSA proof of concept has been successfully completed as part of the strategy to reduce static keys; implementation by individual teams is pending. Other potential long-term solutions will be explored based on the short-term inventory findings.\n "
    },
    "Content Space AI Tagging": {
      "2026-11": "90% content AI tagging covered.\n"
    },
    "Data Semantic Layer": {
      "2026-11": "The POC phase validation has been completed. The overall project framework has been designed, table and metric-related information is currently being entered, and the semantic engine is under design."
    },
    "AI Foundation & Governance": {
      "2026-11": "Currently aligning with the Global Engineering Platform team. The next step is to match each CN ADR with its corresponding Global EA ADR. We are also preparing to start POCs for both the global and local solutions.\n"
    },
    "Service / Component Upgrade & Vulnerability Remediation": {
      "2026-11": "Upgrades are proceeding as planned, with nothing unusual to report. Now that Double 11 is over, team start upgrading the production Kubernetes clusters and related components."
    },
    "One Data Phase 2": {
      "2026-11": ""
    },
    "BR & Multi-Cloud Operational Readiness (Huawei Cloud)": {
      "2026-11": "Work is progressing according to the kickoff plan. This month, the main focus is setting up and preparing the infrastructure and resources using Terraform. Starting next week, we will use a pilot service to validate the infrastructure capabilities and ensure the end-to-end process works. We will also sync with the EMs from each product team next week to discuss the details and related topics.\n"
    },
    "AI Data Governance & Redundant Asset Deprecation": {
      "2026-11": "The first batch of pilot asset cleanup is complete, with 1,578 tables and 26 tasks decommissioned. Steps 2, 3, and 4 in the diagram can be considered complete.\n\nWe are now at step 5 and have expanded the cleanup scope. The second batch has been identified, and we are currently confirming the owners.\n"
    }
  },
  "statuses": {
    "AI Testing Management": "Development On Track",
    "AI Agent for Automated Troubleshooting (SRE Agent)": "In house Poc",
    "Data Backup & Disaster Recovery (CDH)": "Stage 3 Started",
    "Secret Key & Credential Governance": "Secret key grooming done",
    "Content Space AI Tagging": "Coverage: 60% -> 90%",
    "Data Semantic Layer": "POC validation Done",
    "AI Foundation & Governance": "Global Alignment",
    "Service / Component Upgrade & Vulnerability Remediation": "On track",
    "BR & Multi-Cloud Operational Readiness (Huawei Cloud)": "Infra settingup",
    "AI Data Governance & Redundant Asset Deprecation": "Expanded scope"
  }
};
