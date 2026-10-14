(function() {
    const MAX_BYTES = 4 * 1024 * 1024;

    const FILES = [
        {
            id: 'group-event-guide',
            title: 'Group Event Reference Guide',
            description: 'Quick-reference guide for planning and running a group sandwich-making event. Everything your team needs to know on a single page',
            path: 'toolkit/Group_Event_Reference_Guide Final.pdf',
            kind: 'pdf',
            types: ['application/pdf'],
            action: 'Download PDF',
            downloadAll: true
        },
        {
            id: 'food-safety',
            title: 'Food Safety for Volunteers',
            description: 'Essential guide to safe food handling and storage. Explains temperature rules, sanitation steps, the two-hour rule for deli meat, and safe delivery procedures to protect recipients and volunteers',
            path: '20260531-TSP-Food+Safety+Volunteers.pdf',
            kind: 'pdf',
            types: ['application/pdf'],
            action: 'Download PDF',
            downloadAll: true
        },
        {
            id: 'pbj-making',
            title: 'PB&J Sandwich Making 101',
            description: 'Step-by-step guide for preparing safe, high-quality peanut butter and jelly sandwiches for donation. Includes portion sizes, packaging instructions, and best practices for consistency and hygiene',
            path: 'toolkit/PBJ Sandwich Making 2 101 03172026.pdf',
            kind: 'pdf',
            types: ['application/pdf'],
            action: 'Download PDF',
            downloadAll: true
        },
        {
            id: 'deli-making',
            title: 'Deli Sandwich Making 101',
            description: 'Comprehensive instructions for making turkey or chicken sandwiches using only pre-packaged deli meat. Covers food safety, portioning, packaging, and refrigeration standards to maintain freshness',
            path: 'toolkit/Deli Sandwich Making 101 03172026.pdf',
            kind: 'pdf',
            types: ['application/pdf'],
            action: 'Download PDF',
            downloadAll: true
        },
        {
            id: 'pbj-labels',
            title: 'PB&J Labels',
            description: 'Printable labels for peanut butter and jelly sandwiches. Include space for volunteer initials, prep date, and storage notes, with clear "Contains Nuts" warnings to ensure allergen safety',
            path: 'toolkit/Pbj labels.pdf',
            kind: 'pdf',
            types: ['application/pdf'],
            action: 'Download PDF',
            downloadAll: true
        },
        {
            id: 'deli-labels',
            title: 'Deli Sandwich Labels',
            description: 'Printable labels for deli sandwich loaves. Provide fields for meat type, quantity, volunteer initials, and date, plus safety checkboxes for glove use and refrigeration, helping maintain food safety and traceability',
            path: 'toolkit/DELI_Labels_v5.pdf',
            kind: 'pdf',
            types: ['application/pdf'],
            action: 'Download PDF',
            downloadAll: true
        },
        {
            id: 'deli-portion-guide',
            title: 'Deli Meat Portion Guide',
            description: 'Quick visual guide for portioning deli meat by brand. Shows how many slices equal 2 oz per sandwich for Costco Kirkland and Oscar Mayer turkey breast',
            path: 'toolkit/Deli_Meat_Portion_Guide.png',
            kind: 'image',
            types: ['image/png', 'image/jpeg', 'image/webp'],
            action: 'View Guide',
            downloadAll: false,
            alt: 'Infographic from The Sandwich Project comparing deli meat slices: 2 slices of Costco Kirkland Oven Roasted Turkey Breast equals 2oz, while 5 slices of Oscar Mayer Shaved Turkey Breast equals 2oz.'
        }
    ];

    function typeFromName(name) {
        const lower = String(name || '').toLowerCase();
        if (lower.endsWith('.pdf')) return 'application/pdf';
        if (lower.endsWith('.png')) return 'image/png';
        if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
        if (lower.endsWith('.webp')) return 'image/webp';
        return '';
    }

    function matchingType(item, type, name) {
        const normalized = item.types.indexOf(type) !== -1 ? type : typeFromName(name);
        return item.types.indexOf(normalized) !== -1 ? normalized : '';
    }

    window.TSP_TOOLKIT_FILES = FILES;
    window.TSP_TOOLKIT_MAX_BYTES = MAX_BYTES;
    window.TSP_toolkitFileName = function(path) {
        return String(path || '').split('/').pop();
    };
    window.TSP_toolkitSafeName = function(name) {
        const cleaned = String(name || 'toolkit-file').replace(/[\\/:*?"<>|\u0000-\u001f]/g, '').trim().slice(0, 180);
        return cleaned || 'toolkit-file';
    };
    window.TSP_toolkitType = function(item, file) {
        if (!file || file.size <= 0 || file.size > MAX_BYTES) return '';
        return matchingType(item, file.type, file.name);
    };
    window.TSP_toolkitAlt = function(item, record) {
        if (!item || item.kind !== 'image') return '';
        const alt = record && typeof record.alt === 'string' ? record.alt.trim() : '';
        if (!alt || alt.length > 500 || /[\u0000-\u001f]/.test(alt)) return item.title;
        return alt;
    };
    window.TSP_toolkitRecordOk = function(item, record) {
        if (!record || typeof record !== 'object') return false;
        if (typeof record.data !== 'string' || typeof record.name !== 'string' || typeof record.type !== 'string') return false;
        if (item.types.indexOf(record.type) === -1) return false;
        if (record.alt != null && (typeof record.alt !== 'string' || record.alt.length > 500 || /[\u0000-\u001f]/.test(record.alt))) return false;
        if (record.data.length > 5600000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(record.data)) return false;
        return true;
    };
})();
