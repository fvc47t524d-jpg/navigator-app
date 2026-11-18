import { translate } from '../utils/localize';
import { getIssueCategories } from './IssueCategory';

export * from './IssueCategory';

export const IssueType = Object.freeze({
    VEHICLE: 'Vehicle',
    DRIVER: 'Driver',
    ROUTE: 'Route',
    PAYLOAD_CARGO: 'Payload Cargo',
    SOFTWARE_TECHNICAL: 'Software Technical',
    OPERATIONAL: 'Operational',
    CUSTOMER: 'Customer',
    SECURITY: 'Security',
    ENVIRONMENTAL_SUSTAINABILITY: 'Environmental Sustainability',
});

export const IssuePriority = Object.freeze({
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical',
    SCHEDULED_MAINTENANCE: 'Scheduled Maintenance',
    OPERATIONAL_SUGGESTION: 'Operational Suggestion',
});

export const IssueStatus = Object.freeze({
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    BACKLOGGED: 'Backlogged',
    REQUIRES_UPDATE: 'Requires Update',
    IN_REVIEW: 'In Review',
    RE_OPENED: 'Re Opened',
    DUPLICATE: 'Duplicate',
    PENDING_REVIEW: 'Pending Review',
    ESCALATED: 'Escalated',
    COMPLETED: 'Completed',
    CANCELED: 'Canceled',
});

export const FuelReportStatus = Object.freeze({
    DRAFT: 'Draft',
    PENDING_APPROVAL: 'Pending Approval',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    REVISED: 'Revised',
    SUBMITTED: 'Submitted',
    IN_REVIEW: 'In Review',
    CONFIRMED: 'Confirmed',
    ARCHIVED: 'Archived',
    CANCELED: 'Canceled',
});

export const DriverFuelReportStatus = Object.freeze({
    DRAFT: 'Draft',
    REVISED: 'Revised',
    SUBMITTED: 'Submitted',
    ARCHIVED: 'Archived',
    CANCELED: 'Canceled',
});

// Option labels are translated at call time (enums.<group>.<KEY>); the stored value stays the key.
function convertEnumToArray(enumObj, group) {
    return Object.entries(enumObj).map(([key, value]) => ({ key, value: translate(`enums.${group}.${key}`, { defaultValue: value }) }));
}

/** Display label for a stored enum key (e.g. 'VEHICLE'), in the current language. */
export function enumLabel(group, key, fallback) {
    if (!key) return fallback;
    const normalized = String(key).toUpperCase().replace(/[\s-]+/g, '_');
    return translate(`enums.${group}.${normalized}`, { defaultValue: fallback ?? key });
}

/** Translation key for an issue category, which is stored as its English text. */
function issueCategoryKey(category) {
    return String(category).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

/** Display label for a stored issue category. */
export function issueCategoryLabel(category, fallback) {
    if (!category) return fallback;
    return translate(`issueCategories.${issueCategoryKey(category)}`, { defaultValue: fallback ?? category });
}

/** Issue categories for a type as { value, label } options; the value stays the original English text. */
export function getIssueCategoryOptions(type) {
    return getIssueCategories(type).map((category) => ({ value: category, label: issueCategoryLabel(category) }));
}

export function getIssueTypes() {
    return convertEnumToArray(IssueType, 'IssueType');
}

export function getIssuePriorities() {
    return convertEnumToArray(IssuePriority, 'IssuePriority');
}

export function getIssueStatuses() {
    return convertEnumToArray(IssueStatus, 'IssueStatus');
}

export function getFuelReportStatuses() {
    return convertEnumToArray(FuelReportStatus, 'FuelReportStatus');
}

export function getDriverFuelReportStatuses() {
    return convertEnumToArray(DriverFuelReportStatus, 'FuelReportStatus');
}
