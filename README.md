# AccessFlow

AccessFlow is a web application for managing access requests and approvals inside an organization.

Employees submit requests for access to resources (repos, databases, admin tools), and managers review, approve, or deny them. The system centralizes approvals so access decisions are documented, time-bound, and auditable.

## Status

Backend — Django + DRF (Completed)
- Create + list access requests
- Request status (pending / approved / denied)
- Requester + approver relationships
- Timestamps + audit fields

Frontend — In Progress
- Submit new access requests
- View “My Requests”
- Manager approval dashboard

## Workflow

1) User submits access request (resource, reason, duration)
2) Request is routed to appropriate approver
3) Approver approves / denies
4) Approved access is temporary (expiration planned)
5) All actions are recorded for auditing

AccessFlow is an active work-in-progress application.
